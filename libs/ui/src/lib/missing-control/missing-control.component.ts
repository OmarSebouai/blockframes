import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: '[control] missing-control',
  templateUrl: './missing-control.component.html',
  styleUrls: ['./missing-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissingControlComponent {
  @Input() control: FormControl;
  @Input() link: string;
  @Input() fragment: string;
}
