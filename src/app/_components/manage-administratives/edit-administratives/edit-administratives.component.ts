import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdministrativeService } from "../../../_services/administrative.service";
import { NotificationService } from "../../../_services/notification.service";
import { Notification } from "../../../_models/notification";

@Component({
  selector: "app-edit-administratives",
  templateUrl: "./edit-administratives.component.html"
})
export class EditAdministrativesComponent implements OnInit, OnDestroy {


    editAdministrativeForm: FormGroup = new FormGroup({});
    notification: Notification | null = null;
    administrativeId: number;

    constructor(
        private formBuilder: FormBuilder,
        private administrativeService: AdministrativeService,
        private notificationService: NotificationService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.administrativeId = +this.route.snapshot.paramMap.get('id')!;
    }


    ngOnInit(): void {
        this.initializeForm();
        this.loadClientDetails();
    }

    initializeForm(): void {
        this.editAdministrativeForm = this.formBuilder.group({
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
        });
    }

    validPhone(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const phone = control.value;      

            return 10000000 <= phone && phone <= 99999999 ? null : { invalidPhone: true };
        };
    }

    loadClientDetails(): void {
        this.administrativeService.getAdministrative(this.administrativeId).subscribe({
            next: (administrative) => {
                this.editAdministrativeForm.patchValue(administrative);
            },
            error: (error) => {
                this.notification = {
                    message: "Ocurrió un error al cargar los detalles de la habitación.",
                    success: false
                  };
              }
        });
    }

    updateAdministrative(): void {
        const values = { ...this.editAdministrativeForm.value };

        this.administrativeService.updateAdministrative(this.administrativeId, values).subscribe({
            next: () => {
                this.router.navigateByUrl("/manage-administratives").then(() =>
                  this.notificationService.setNotification(true, "Administrativo actualizado exitosamente")
                );
              },
            error: (error) => {
                this.notification = {
                    message: "Ocurrió un error al actualizar el administrativo.",
                    success: false
                };
            }
        });
    }

    closeNotification(): void {
        this.notification = null;
    }

    ngOnDestroy(): void {
        this.notificationService.clearNotification();
    }





}