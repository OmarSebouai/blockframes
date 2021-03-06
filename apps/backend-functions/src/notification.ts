import { NotificationDocument, NotificationOptions } from './data/types';
import { db } from './internals/firebase';
import { firestore } from 'firebase-admin';

/** Takes one or more notifications and add them on the notifications collection */
export function triggerNotifications(notifications: NotificationDocument[]): Promise<any> {
  const batch = db.batch();

  notifications.forEach((notification: NotificationDocument) => {
    const notificationRef = db.collection('notifications').doc(notification.id);
    batch.set(notificationRef, notification);
  });

  return batch.commit();
}

/** Create a Notification with required and generic information. */
export function createNotification(notification: NotificationOptions): NotificationDocument {
  return {
    toUserId: '',
    id: db.collection('notifications').doc().id,
    isRead: false,
    date: firestore.Timestamp.now(),
    ...notification
  };
}
