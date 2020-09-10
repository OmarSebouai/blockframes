// Angular
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ContentChild,
  TemplateRef,
  Directive,
  ChangeDetectorRef
} from '@angular/core';

// RxJs
import { Observable } from 'rxjs';
import { startWith, distinctUntilChanged, map } from 'rxjs/operators';

// Blockframes
import { EntityControl, FormEntity, FormList } from '@blockframes/utils/form';
import { MediaFormList } from '@blockframes/media/form/media-list.form';

@Directive({ selector: '[formView]' })
export class FormViewDirective { }

@Directive({ selector: '[itemRef]' })
export class ItemRefDirective { }

@Component({
  selector: '[form] bf-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormListComponent<T> implements OnInit {

  @Input() form: FormList<T> | MediaFormList<EntityControl<Record<string, T>>, T>;
  @Input() buttonText = 'Add';
  @Input() saveButtonText = 'Save'

  @ContentChild(ItemRefDirective, { read: TemplateRef }) itemRef: ItemRefDirective;
  @ContentChild(FormViewDirective, { read: TemplateRef }) formView: FormViewDirective;

  list$: Observable<any[]>;
  formItem: FormEntity<EntityControl<T>, T>;
  activeIndex: number;
  activeValue: T

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.form instanceof FormList) {
      this.list$ = this.form.valueChanges.pipe(
        startWith(this.form.value),
        distinctUntilChanged(),
      );
    } else if (this.form instanceof MediaFormList) {
      this.list$ = this.form.valueChanges.pipe(
        distinctUntilChanged(),
        map((values) => Object.keys(values).map(key => values[key])),
        startWith(
          Object.keys(this.form.value).map(key => this.form.value[key])
        ),
      )
    }

    /* If form is empty, we need a placeholder for the ngTemplateOutletContext */
    if (this.isFormEmpty) {
      this.add();
    } else {
      this.formItem = this.form.last();
    }
  }

  get isFormEmpty() {
    return !this.form.length
  }

  // Add a clean form
  add() {
    this.formItem = this.form.createControl({});
  }

  save() {
    if (this.formItem.valid) {
      /* If active index is below 0 we want to push the formItem otherwise we are stuck where the table is not shown
      and also no form */
      if (typeof this.activeIndex === 'number' && !this.isFormEmpty) {
        delete this.activeIndex;
      } else {
        this.form.push(this.formItem);
      }
      delete this.formItem;
      this.cdr.markForCheck();
    }
  }

  edit(index: number) {
    this.activeIndex = index
    this.formItem = this.form.at(index);
    this.activeValue = this.formItem.value;
    this.cdr.markForCheck();
  }

  cancel() {
    if (typeof this.activeIndex === 'number') {
      this.form.at(this.activeIndex).setValue(this.activeValue);
      delete this.activeIndex;
      delete this.activeValue;
    }
    delete this.formItem;
  }

  remove(index: number) {
    this.form.removeAt(this.activeIndex);
    if (this.activeIndex > index) {
      this.activeIndex--;
    }
    if (this.isFormEmpty) {
      this.add();
    }
  }
}
