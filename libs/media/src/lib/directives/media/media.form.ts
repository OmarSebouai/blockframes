import { HostedMedia, createHostedMedia, ExternalMedia, createExternalMedia } from '../../+state//media.firestore'
import { FormControl } from '@angular/forms';
import { FormEntity } from '@blockframes/utils/form/forms/entity.form';

// ------------------------------
//        External Media
// ------------------------------

function createExternalMediaControl(media: ExternalMedia) {
  const { url } = createExternalMedia(media);
  return {
    url: new FormControl(url),
  }
}

export type ExternalMediaControl = ReturnType<typeof createExternalMediaControl>;

export class ExternalMediaForm extends FormEntity<ExternalMediaControl> {
  constructor(media: Partial<ExternalMedia> = {}) {
    const externalMedia = createExternalMedia(media);
    const control = createExternalMediaControl(externalMedia);
    super(control);
  }

  get url() { return this.get('url') }
}

// ------------------------------
//          Hosted Media
// ------------------------------

function createHostedMediaControl(media: HostedMedia) {
  const { ref, url } = createHostedMedia(media);
  return {
    oldRef: new FormControl(ref),
    ref: new FormControl(ref),
    url: new FormControl(url),
    blob: new FormControl(),
    delete: new FormControl(false),
    fileName: new FormControl('')
  }
}

export type HostedMediaControl = ReturnType<typeof createHostedMediaControl>;

export class HostedMediaForm extends FormEntity<HostedMediaControl> {
  constructor(media: Partial<HostedMedia> = {}) {
    const hostedMedia = createHostedMedia(media);
    const control = createHostedMediaControl(hostedMedia);
    super(control);
  }

  get oldRef() { return this.get('oldRef') }
  get ref() { return this.get('ref') }
  get url() { return this.get('url') }
  get blob() { return this.get('blob') }
  get delete() { return this.get('delete') }
  get fileName() { return this.get('fileName') }
}
