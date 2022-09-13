import { AbstractControl } from "@angular/forms";

export class blankSpaceValidator{
    static validate(control: AbstractControl) {
        let isValid = false;
        if (control.value && /\S/.test(control.value) && control.value[0] != " ") {
            isValid = true;
        }
        else if (control.value==null||control.value==""){
            isValid = true;
        }
        return isValid ? null : { 'whitespace': true }
    }
}