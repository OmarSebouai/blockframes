import { Injectable } from '@angular/core';
import { Organization, RightsService, OrganizationQuery } from '@blockframes/organization';
import { createTemplate, Template } from './template.model';
import { Material, MaterialQuery } from '../../material/+state';
import { TemplateQuery } from './template.query';
import { FireQuery } from '@blockframes/utils';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  constructor(
    private db: FireQuery,
    private query: TemplateQuery,
    private materialQuery: MaterialQuery,
    private orgQuery: OrganizationQuery,
    private rightsService: RightsService
  ) {}

  public async addTemplate(templateName: string): Promise<string> {
    const templateId = this.db.createId();
    const org = this.orgQuery.getValue().org;
    const orgDoc = this.db.doc<Organization>(`orgs/${org.id}`);
    const template = createTemplate({
      id: templateId,
      name: templateName,
      orgId: org.id
    });

    // Push the new id in org.templateIds
    await this.db.doc<Organization>(`orgs/${org.id}`).update({templateIds: [...org.templateIds, templateId]})
    await this.rightsService.createDocAndRights(template, org.id);

    return templateId;
  }

  public deleteTemplate(id: string) {
    this.db.doc<Template>(`templates/${id}`).delete();
  }

  public deleteMaterial(id: string) {
    const templateId = this.query.getActiveId();
    this.db.doc<Material>(`templates/${templateId}/materials/${id}`).delete();
  }

  public saveMaterial(material: Material) {
    const templateId = this.query.getActiveId();
    const materialId = this.db.createId();
    this.db
      .doc<Material>(`templates/${templateId}/materials/${materialId}`)
      .set({ ...material, id: materialId });
  }

  public updateMaterial(material: Material) {
    const templateId = this.query.getActiveId();
    this.db.doc<Material>(`templates/${templateId}/materials/${material.id}`).update(material);
  }

  /** Save a delivery as new template */
  public async saveAsTemplate(templateName: string) {
    const materials = this.materialQuery.getAll();
    if (materials.length > 0) {
      // Add a new template
      const templateId = this.addTemplate(templateName);

      // Add the delivery's materials in the template
      const batch = this.db.firestore.batch();
      materials.forEach(material => {
        const materialWithoutStep = { ...material, step: null };
        delete materialWithoutStep.step;
        const materialDoc = this.db.doc<Material>(
          `templates/${templateId}/materials/${material.id}`
        );
        return batch.set(materialDoc.ref, materialWithoutStep);
      });
      batch.commit();
    }
  }

  /** Update template with delivery's materials */
  public async updateTemplate(name: string) {
    const template = this.query
      .getAll()
      .find(entity => entity.name === name && entity.orgId === this.orgQuery.getValue().org.id);
    const templateMaterials = await this.db.snapshot<any>(`templates/${template.id}/materials`);
    const deliveryMaterials = this.materialQuery.getAll();
    if (deliveryMaterials.length > 0) {
      const batch = this.db.firestore.batch();
      // Delete all materials of template
      templateMaterials.forEach(material => {
        const materialDoc = this.db.doc<Material>(
          `templates/${template.id}/materials/${material.id}`
        );
        return batch.delete(materialDoc.ref);
      });
      // Add delivery's materials in template
      deliveryMaterials.forEach(material => {
        const materialWithoutStep = { ...material, step: null };
        delete materialWithoutStep.step;
        const materialDoc = this.db.doc<Material>(
          `templates/${template.id}/materials/${material.id}`
        );
        return batch.set(materialDoc.ref, materialWithoutStep);
      });
      batch.commit();
    }
  }

  /** Check if name is already used in an already template */
  public nameExists(name: string, org: Organization) {
    return this.query.hasEntity(entity => entity.name === name && entity.orgId === org.id);
  }
}
