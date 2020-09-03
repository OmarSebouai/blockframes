import { Pipe, NgModule } from "@angular/core";
import { AbstractControl, FormControl, FormArray, FormGroup } from "@angular/forms";

@Pipe({ name: 'isEmpty' })
class ControlEmptyPipe {
  transform(control: AbstractControl) {
    if (control instanceof FormControl) {
      return (control.value ?? false);
    }
    if (control instanceof FormArray) {
      return !!(control.value.length)
    }
    if (control instanceof FormGroup) {
      return Object.values(control.controls).every(control => control.valid) && !!Object.keys(control.controls).length;
    }
  }
}

@NgModule({
  exports: [ControlEmptyPipe],
  declarations: [ControlEmptyPipe],
})
export class ControlEmptyPipeModule { }
