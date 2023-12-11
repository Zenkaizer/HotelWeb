import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
    selector: 'app-select-input',
    templateUrl: './select-input.component.html',
})
export class SelectInputComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() requiredMessage: string = '';
    @Input() defaultOption: string = '';
    @Input() options: string[] = [];
    @Input() values: any[] = [];
    @Input() formControl: any;

    constructor(@Self() public controlDir: NgControl) {
        this.controlDir.valueAccessor = this;
    }
    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }
    setDisabledState?(isDisabled: boolean): void {
    }

    get control() {
        return this.controlDir.control as FormControl;
    }
}