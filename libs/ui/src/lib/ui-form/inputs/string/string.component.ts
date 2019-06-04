import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringComponent  {

  @Input() form: FormGroup;
  @Input() type = 'text';
  @Input() placeholder = 'placeholder';
  @Input() name = 'default';
  @Input() required = false;
  @Input() matcher = false;
  
  constructor() {}
}
