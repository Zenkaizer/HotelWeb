import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AdministrativeService } from "../../../_services/administrative.service";
import { NotificationService } from "../../../_services/notification.service";
import { Notification } from "../../../_models/notification";

@Component({
    selector: "app-create-administrative",
    templateUrl: "./create-administrative.component.html"
})
export class CreateAdministrativeComponent implements OnInit, OnDestroy {

    createAdministrativeForm: FormGroup = new FormGroup({});
    notification: Notification | null = null;

    nationalities = ["Chilena", "Extranjera"];

    constructor(
        private formBuilder: FormBuilder,
        private administrativeService: AdministrativeService,
        private notificationService: NotificationService,
        private router: Router) {

    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {

        this.createAdministrativeForm = this.formBuilder.group({
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
            ]

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

    validDate(): ValidatorFn {
        return (control: AbstractControl) => {
            return control.value < new Date() ? null : { invalidDate: true };
        };
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

    ngOnDestroy(): void {
        this.notificationService.clearNotification();
    }

    createAdministrative(): void {

        const birthDate = this.getDateOnly(this.createAdministrativeForm.controls['birthdate'].value);
        const values = {...this.createAdministrativeForm.value, birthDate};

        console.log(values);

        this.administrativeService.createAdministrative(values).subscribe({
            next: () => this.router.navigateByUrl("/manage-administratives").then(() => 
                this.notificationService.setNotification(true, "Administrativo creado exitosamente")),
            error: error => {
                this.notification = {
                    message: error.error,
                    success: false
                };
            }
        });

    }

}