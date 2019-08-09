/**
 * Manage invitations updates.
 */
import {
  createOrganizationDocPermissions,
  createUserDocPermissions,
  getDocument,
  getSuperAdmins
} from './data/internals';
import { db, functions, getUserMail } from './internals/firebase';
import {
  Delivery,
  Invitation,
  InvitationOrUndefined,
  InvitationStakeholder,
  InvitationState,
  InvitationFromOrganizationToUser,
  InvitationType,
  Organization,
  InvitationFromUserToOrganization
} from './data/types';
import { prepareNotification, triggerNotifications } from './notify';
import { sendMail } from './internals/email';
import { userInviteToOrg, userRequestedToJoinYourOrg } from './assets/mail-templates';

/** Checks if an invitation just got accepted. */
function wasAccepted(before: Invitation, after: Invitation) {
  return before.state === InvitationState.pending && after.state === InvitationState.accepted;
}

/** Checks if an invitation just got created. */
function wasCreated(before: InvitationOrUndefined, after: Invitation) {
  return !before && !!after;
}

async function addUserToOrg(userId: string, organizationId: string) {
  if (!organizationId || !userId) {
    throw new Error(`missing data: userId=${userId}, organizationId=${organizationId}`);
  }

  console.debug("add user:", userId, "to org:", organizationId);

  const userRef = db.collection('users').doc(userId);
  const organizationRef = db.collection('orgs').doc(organizationId);
  const permissionsRef = db.collection('permissions').doc(organizationId);

  return db.runTransaction(async tx => {
    const [user, organization, permission] = await Promise.all([
      tx.get(userRef),
      tx.get(organizationRef),
      tx.get(permissionsRef)
    ]);

    const userData = user.data();
    const organizationData = organization.data();
    const permissionData = permission.data();

    if (!userData || !organizationData || !permissionData) {
      console.error(
        'Something went wrong with the invitation, a required document is not set',
        userData,
        organizationData,
        permissionData
      );
      return;
    }

    return Promise.all([
      // Update user's orgId
      tx.set(userRef, { ...userData, orgId: organizationId }),
      // Update organization
      tx.set(organizationRef, {
        ...organizationData,
        userIds: [...organizationData.userIds, userId]
      }),
      // Update Permissions
      tx.set(permissionsRef, { ...permissionData, admins: [...permissionData.admins, userId] })
    ]);
  });
}

async function mailOnInvitationAccept(userId: string, organizationId: string) {
  const userEmail = await getUserMail(userId);
  const adminIds = await getSuperAdmins(organizationId);
  const adminEmails = await Promise.all(adminIds.map(getUserMail));

  return Promise.all([
    sendMail({
      to: userEmail!,
      subject: 'You join a new organization',
      text: 'TODO'
    }),
    ...adminEmails
      .filter(mail => !!mail)
      .map(adminEmail =>
        sendMail({
          to: adminEmail!,
          subject: 'A user joined the organization',
          text: `user: ${userEmail}`
        })
      )
  ]);
}

/** Updates the user, orgs, and permissions when the user accepts an invitation to an organization. */
async function onInvitationToOrgAccept({
  userId,
  organizationId,
  id
}: InvitationFromOrganizationToUser) {
  // TODO: When a user is added to an org, clear other invitations
  await addUserToOrg(userId, organizationId);
  await deleteInvitation(id);
  return mailOnInvitationAccept(userId, organizationId);
}

/** Sends an email when an organization invites a user to join. */
async function onInvitationToOrgCreate({ userId }: InvitationFromOrganizationToUser) {
  const userMail = await getUserMail(userId);

  if (!userMail) {
    console.error('No user email provided for userId:', userId);
    return;
  } else {
    return sendMail(userInviteToOrg(userMail));
  }
}

/**
 * Updates permissions when an organization / user accepts a invitation to
 * work on a document (deliveries, movies, etc).
 */
async function onStakeholderInvitationAccept({
  docId,
  organizationId,
  docType
}: InvitationStakeholder): Promise<any> {
  // If the stakeholder accept the invitation, we create all permissions and notifications
  // we need to get the new users on the documents with their own (and limited) permissions.

  // Create all the constants we need to work with
  const stakeholderId = organizationId;
  const delivery = await getDocument<Delivery>(`deliveries/${docId}`);

  const [
    organizationDocPermissionsSnap,
    userDocPermissionsSnap,
    stakeholderSnap,
    organizationSnap,
    organizationMoviePermissionsSnap,
    userMoviePermissionsSnap,
    organization
  ] = await Promise.all([
    db.doc(`permissions/${stakeholderId}/orgDocsPermissions/${docId}`).get(),
    db.doc(`permissions/${stakeholderId}/userDocsPermissions/${docId}`).get(),
    db.doc(`deliveries/${docId}/stakeholders/${stakeholderId}`).get(),
    db.doc(`orgs/${stakeholderId}`).get(),
    db.doc(`permissions/${stakeholderId}/orgDocsPermissions/${delivery.movieId}`).get(),
    db.doc(`permissions/${stakeholderId}/userDocsPermissions/${delivery.movieId}`).get(),
    getDocument<Organization>(`orgs/${stakeholderId}`)
  ]);

  const orgDocPermissions = createOrganizationDocPermissions({
    id: docId,
    canUpdate: true
  });
  const userDocPermissions = createUserDocPermissions({ id: docId });
  const orgMoviePermissions = createOrganizationDocPermissions({ id: delivery.movieId });
  const userMoviePermissions = createUserDocPermissions({ id: delivery.movieId });

  return db.runTransaction(tx => {
    return Promise.all([
      // Initialize organization permissions on a document owned by another organization
      tx.set(organizationDocPermissionsSnap.ref, orgDocPermissions),

      // Then Initialize user permissions document
      tx.set(userDocPermissionsSnap.ref, userDocPermissions),

      // Make the new stakeholder active on the delivery by switch isAccepted property from false to true
      tx.update(stakeholderSnap.ref, { isAccepted: true }),

      // Push the delivery's movie into stakeholder Organization's movieIds so users have access to the new doc
      tx.update(organizationSnap.ref, {
        movieIds: [...organization.movieIds, delivery.movieId]
      }),

      // Finally, also initialize reading rights on the movie for the invited organization
      tx.set(organizationMoviePermissionsSnap.ref, orgMoviePermissions),
      tx.set(userMoviePermissionsSnap.ref, userMoviePermissions),

      // Now that permissions are in the database, notify organization users with direct link to the document
      triggerNotifications(
        organization.userIds.map(userId => {
          return prepareNotification({
            message:
              `You can now work on ${docType} ${docId}.\n` +
              `Click on the link below to go to the ${docType}`,
            userId,
            docInformations: { id: docId, type: docType },
            path: '/TODO/redefine/path' // TODO: redefine paths correctly
          });
        })
      )
    ]);
  });
}

/**
 * Dispatch 'creation' and 'accepted' events when an invitation to
 * join an organization is updated.
 */
async function onInvitationToOrgUpdate(
  before: InvitationOrUndefined,
  after: Invitation,
  invitation: InvitationFromOrganizationToUser
): Promise<any> {
  if (wasCreated(before, after)) {
    return onInvitationToOrgCreate(invitation);
  } else if (wasAccepted(before!, after)) {
    return onInvitationToOrgAccept(invitation);
  }
  return;
}

/** Sends an email when an organization invites a user to join. */
async function onInvitationFromUserToJoinOrgCreate({
  organizationId,
  userId
}: InvitationFromUserToOrganization) {
  const userEmail = await getUserMail(userId);

  if (!userEmail) {
    throw new Error(`no email for userId: ${userId}`);
  }

  const superAdmins = await getSuperAdmins(organizationId);

  return Promise.all(
    superAdmins.map(async adminId => {
      const adminMail = await getUserMail(adminId);
      if (!adminMail) {
        console.error('no mail for admin:', adminId);

        return;
      }
      return sendMail(userRequestedToJoinYourOrg(adminMail, userEmail));
    })
  );
}

async function deleteInvitation(invitationId: string) {
  // Delete the invitation
  const invitationRef = db.collection('invitations').doc(invitationId);
  await invitationRef.delete();
}

/** Send a mail and update the user, org and permission when the user was accepted. */
async function onInvitationFromUserToJoinOrgAccept({
  organizationId,
  userId,
  id
}: InvitationFromUserToOrganization) {
  // TODO: When a user is added to an org, clear other invitations
  await addUserToOrg(userId, organizationId);
  await deleteInvitation(id);
  return mailOnInvitationAccept(userId, organizationId);
}

/**
 * Dispatch 'creation' and 'accepted' events when a request to
 * join an organization is updated.
 */
async function onInvitationFromUserToJoinOrgUpdate(
  before: InvitationOrUndefined,
  after: Invitation,
  invitation: InvitationFromUserToOrganization
): Promise<any> {
  if (wasCreated(before, after)) {
    return onInvitationFromUserToJoinOrgCreate(invitation);
  } else if (wasAccepted(before!, after)) {
    return onInvitationFromUserToJoinOrgAccept(invitation);
  }
  return;
}

/** Dispatch 'accepted' event when an invitation to join a document is accepted. */
async function onStakeholderInvitationUpdate(
  before: InvitationOrUndefined,
  after: Invitation,
  invitation: InvitationStakeholder
): Promise<any> {
  if (!before) {
    return;
  }

  if (wasAccepted(before, after)) {
    return onStakeholderInvitationAccept(invitation);
  }
  return;
}

/**
 * Handles firestore updates on an invitation object,
 *
 * Check the data, manage processed ids (to prevent duplicates events in functions),
 * and dispatch to the correct piece of code depending on the invitation type.
 */
export async function onInvitationWrite(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
) {
  const before = change.before;
  const after = change.after;

  if (!before || !after) {
    throw new Error(`Parameter 'change' not found`);
  }

  const invitationDocBefore = before.data() as InvitationOrUndefined;
  const invitationDoc = after.data() as InvitationOrUndefined;

  if (!invitationDoc) {
    // Doc was deleted, ignoring...
    return;
  }

  // Prevent duplicate events with the processedId workflow
  const invitation: Invitation = await getDocument<Invitation>(`invitations/${invitationDoc.id}`);
  const processedId = invitation.processedId;

  if (processedId === context.eventId) {
    console.warn('Document already processed with this context');
    return;
  }

  // TODO(issue#699): redesign the processed id flow to prevent infinite loop due to
  //   the update event being triggered on every processedId change (use another table?)
  // await db.doc(`invitations/${invitation.id}`).update({ processedId: context.eventId });

  try {
    // dispatch to the correct events depending on the invitation type.
    switch (invitation.type) {
      case InvitationType.stakeholder:
        return await onStakeholderInvitationUpdate(invitationDocBefore, invitationDoc, invitation);
      case InvitationType.fromOrganizationToUser:
        return await onInvitationToOrgUpdate(invitationDocBefore, invitationDoc, invitation);
      case InvitationType.fromUserToOrganization:
        return await onInvitationFromUserToJoinOrgUpdate(
          invitationDocBefore,
          invitationDoc,
          invitation
        );
      default:
        throw new Error(`Unhandled invitation: ${JSON.stringify(invitation)}`);
    }
  } catch (e) {
    console.error('invitation management thrown:', e);
    await db.doc(`invitations/${invitation.id}`).update({ processedId: null });
    throw e;
  }
}
