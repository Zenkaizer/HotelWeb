import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators,ValidatorFn, AbstractControl } from "@angular/forms";
import { Notification } from "../../../_models/notification";
import { AccountService } from "../../../_services/account.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup = new FormGroup({});
    notification: Notification | null = null;

    nationalities = ["Chilena", "Extranjera"];

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {

        this.registerForm = this.formBuilder.group({
            dni: ["", [
                Validators.required,
                this.validIdNumber()]
            ],
            email: ["", [
                Validators.required, 
                Validators.email]
            ],
            firstName: ["", [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255)]
            ],
            lastName: ["", [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255)]
            ],
            phone: ["", [
                Validators.required,
                this.validPhone()]
            ],
            nationality: ["", [
                Validators.required]
            ],
            birthdate: ["", [
                Validators.required,
                this.validDate()]
            ],
            password: ["", [
                Validators.required, 
                Validators.minLength(4),
                Validators.minLength(20)]
            ],
            confirmPassword: ["", [
                Validators.required, 
                this.matchValues("password")]
            ]
        });

        this.registerForm.controls['password'].valueChanges.subscribe({
            next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
        });
    }
    
    validIdNumber(): ValidatorFn {
        return (control: AbstractControl) => {
            const value = control.value;
            const rutRegex: RegExp = /^(\d{7,8})-(\d|k|K)$/;
            const passportRegex: RegExp = /^[A-Z0-9]{6,12}$/;
            
            return rutRegex.test(value) || passportRegex.test(value) ? null : { invalidRut: true };
        };
    }

    validPhone(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const phone = control.value;      

            return 10000000 <= phone && phone <= 99999999 ? null : { invalidPhone: true };
        };
    }

    matchValues(matchTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            return control.value === control.parent?.get(matchTo)?.value ? null : { noMatching: true };
        };
    }

    validDate(): ValidatorFn {
        return (control: AbstractControl) => {
            return control.value < new Date() ? null : { invalidDate: true };
        };
    }

    register(): void {
        //const birthDate = this.getDateOnly(this.registerForm.controls['birthdate'].value);
        const values = {...this.registerForm.value};
        console.log(values);

        this.accountService.register(values).subscribe({
            next: () => this.router.navigateByUrl("/"),
            error: error => {
                this.notification = {
                    message: error.error,
                    success: false
                };
            }
        });
    }

    closeNotification(): void {
        this.notification = null;
    }

    getDateOnly(birthdate: string | undefined): string | undefined {
        if (!birthdate) return;

        let birthdateAux = new Date(birthdate);

        return new Date(birthdateAux.setMinutes(birthdateAux.getMinutes() - birthdateAux.getTimezoneOffset()))
        .toISOString()
        .slice(0, 10);
    }
}