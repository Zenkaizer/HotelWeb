import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ClientService } from "../../../_services/client.service";
import { NotificationService } from "../../../_services/notification.service";
import { Notification } from "../../../_models/notification";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html"
})
export class EditClientComponent implements OnInit, OnDestroy {

    editClientForm: FormGroup = new FormGroup({});
    notification: Notification | null = null;
    clientId: number;

    nationalities = ["Chilena", "Extranjera"];

    constructor(
        private formBuilder: FormBuilder,
        private clientService: ClientService,
        private notificationService: NotificationService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.clientId = +this.route.snapshot.paramMap.get('id')!;
    }

    ngOnInit(): void {
        this.initializeForm();
        this.loadClientDetails();
    }

    initializeForm(): void {
        this.editClientForm = this.formBuilder.group({
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
            nationality: ["", [
                Validators.required]
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
        this.clientService.getClient(this.clientId).subscribe({
            next: (client) => {
                this.editClientForm.patchValue(client);
            },
            error: (error) => {
                this.notification = {
                    message: "Ocurrió un error al cargar los detalles de la habitación.",
                    success: false
                  };
              }
        });
    }

    updateClient(): void {
        const values = { ...this.editClientForm.value };

        this.clientService.updateClient(this.clientId, values).subscribe({
            next: () => {
                this.router.navigateByUrl("/manage-clients").then(() =>
                  this.notificationService.setNotification(true, "Cliente actualizado exitosamente")
                );
              },
            error: (error) => {
                this.notification = {
                    message: "Ocurrió un error al actualizar el cliente.",
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