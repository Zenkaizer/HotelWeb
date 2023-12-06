import { Component, Input, Self } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl } from "@angular/forms";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-date-input',
  templateUrl: 'date-input.component.html',
})
export class DateInputComponent implements ControlValueAccessor{

	@Input() label = '';
    @Input() placeholder: string = '';
    @Input() requiredMessage: string = '';
	@Input() invalidDateMessage: string = '';
	bsConfig: Partial<BsDatepickerConfig> | undefined;

	constructor(@Self() public ngControl: NgControl) {
		this.ngControl.valueAccessor = this;

		this.bsConfig = {
			containerClass: 'theme-dark-blue',
			dateInputFormat: 'DD/MM/YYYY',
			showWeekNumbers: false
		};
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
		return this.ngControl.control as FormControl;
	}

}
