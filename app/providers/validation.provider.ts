import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface IValidationProvider {
  register(form: FormGroup, errorContainer: any, messages: any) : void;
}

@Injectable()
export class ValidationProvider implements IValidationProvider {
  private forms: ValidatedForm[];

  constructor() {
    this.forms = new Array<ValidatedForm>();
  }

  public register(form: FormGroup, errorContainer: any, messages: any) : void {
    let vf = new ValidatedForm(form, errorContainer, messages);
    vf.Form.valueChanges.subscribe(data => this.onValueChanged(vf, data));
    this.forms.push(vf);
  }

  private onValueChanged(vf: ValidatedForm, data?: any): void {
    if (!vf.Form) { return; }

    for (const field in vf.ErrorContainer) {
      // clear previous error message (if any)
      vf.ErrorContainer[field] = '';
      const control = vf.Form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = vf.Messages[field];
        for (const key in control.errors) {
          vf.ErrorContainer[field] += messages[key] + ' ';
        }
      }
    }
  }
}

class ValidatedForm {
  constructor(
    public Form: FormGroup,
    public ErrorContainer: any,
    public Messages: any
  ) {
  }
};

// TODO: For consistency with back-end messages, would normally get these from the server (based on browser language) and cache in local storage
export const DEFAULT_MESSAGES = {
  EMAIL: 'Must be a valid email address.',
  REQUIRED: 'Field is required.'
};

// TODO: For consistency with back-end regex, would normally get these from the server and cache in local storage
export const DEFAULT_PATTERNS = {
  EMAIL: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*'
};
