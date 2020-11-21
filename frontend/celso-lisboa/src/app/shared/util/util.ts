import {FormGroup} from '@angular/forms';

export class Util {

  constructor() {}

  controlPristineIsInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.get(controlName);
    if (!control.pristine) {
      return form.get(controlName).invalid;
    }
    return false;
  }

}
