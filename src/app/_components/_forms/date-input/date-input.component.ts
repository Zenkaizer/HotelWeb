import { Component, Input, Self } from '@angular/core';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, FormControl, NgControl, FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-date-input',
	standalone: true,
	imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe],
	templateUrl: './date-input.component.html',
})
export class DateInputComponent implements ControlValueAccessor {

	@Input() label: string = '';
	@Input() requiredMessage: string = '';
	@Input() invalidDateMessage: string = '';

	model: NgbDateStruct | undefined;

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

	get control(): FormControl {
		return this.controlDir.control as FormControl;
	}
}