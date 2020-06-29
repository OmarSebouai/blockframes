import {
  Component,
  Input,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { HostedMediaForm } from '@blockframes/media/directives/media/media.form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getMimeType } from '@blockframes/utils/file-sanitizer';

@Component({
  selector: '[form] [storagePath] file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {
  /** use in the html to specify the input, ex: ['.json', '.png'] */
  @Input() public accept: string[];
  /** mime type, ex: ['image/png', 'application/json'] */
  @Input() public types: string[];
  /** firestore path */
  @Input() storagePath: string;
  @Input() form: HostedMediaForm;

  public state: 'waiting' | 'hovering' | 'ready' = 'waiting';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    // show current file
    if (this.form.oldRef.value) {
      this.form.patchValue({
        fileName: this.form.oldRef.value.split('/').pop(),
      });
      this.state = 'ready';
    }
  }

  @HostListener('drop', ['$event'])
  // TODO: issue#875, use DragEvent type
  onDrop($event: any) {
    $event.preventDefault();
    this.state = 'ready';
  }

  @HostListener('dragover', ['$event'])
  // TODO: issue#875, use DragEvent type
  onDragOver($event: any) {
    $event.preventDefault();
    this.state = 'hovering';
  }

  @HostListener('dragleave', ['$event'])
  // TODO: issue#875, use DragEvent type
  onDragLeave($event: any) {
    $event.preventDefault();
    this.state = 'waiting';
  }

  public selected(files: FileList) {
    console.log(files);
    if (!files.item(0)) {
      this.snackBar.open('No file found', 'close', { duration: 1000 });
      this.state = 'waiting';
      return;
    }

    const file = files.item(0);

    const fileType = getMimeType(file);

    // Hack around cypress issue with Files and events,
    // See https://github.com/cypress-io/cypress/issues/3613
    if (!(file instanceof File)) {
      // @ts-ignore
      file.__proto__ = new File([], fileType);
    }

    const isFileTypeValid = this.types && this.types.includes(fileType);
    if (!isFileTypeValid) {
      this.snackBar.open(`Unsupported file type: "${fileType}".`, 'close', { duration: 1000 });
      this.state = 'waiting';
      return;
    }

    this.state = 'ready';

    this.form.patchValue({
      ref: this.storagePath,
      blobOrFile: file,
      delete: false,
      fileName: file.name,
    })
    this.form.markAsDirty();
  }

  public reset() {
    this.state = 'waiting';

    this.form.patchValue({
      blobOrFile: undefined,
      delete: false,
      fileName: '',
    })
    this.form.markAsDirty();
  }
}