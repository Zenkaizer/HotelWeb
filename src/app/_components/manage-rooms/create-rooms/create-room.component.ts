import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RoomService } from "../../../_services/room.service";
import { NotificationService } from "../../../_services/notification.service";
import { Notification } from "../../../_models/notification";

@Component({
    selector: "app-create-room",
    templateUrl: "./create-room.component.html"
})
export class CreateRoomComponent implements OnInit, OnDestroy {

    createRoomForm: FormGroup = new FormGroup({});
    notification: Notification | null = null;

    values = ["Si", "No"];

    constructor(
        private formBuilder: FormBuilder,
        private roomService: RoomService,
        private notificationService: NotificationService,
        private router: Router) {

    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {

        this.createRoomForm = this.formBuilder.group({
            individualBeds: ["", [
                Validators.required,
                this.validNumber()]
            ],
            dualBeds: ["", [
                Validators.required,
                this.validNumber()]
            ],
            maxCapacity: ["", [
                Validators.required,
                this.validNumber()]
            ],
            haveBathroom: ["", [
                Validators.required]
            ],
            price: ["", [
                Validators.required,
                this.validPrice()]
            ],
        });
    }

    validNumber(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const validNumber = control.value;

            return 0 <= validNumber && validNumber <= 20 ? null : { invalidNumber: true };

        };
    }

    validPrice(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const price = control.value;

            return 0 <= price && price <= 9999999 ? null : { invalidNumber: true };

        };
    }

    createRoom(): void {

        const values = {...this.createRoomForm.value};
        
        this.roomService.createRoom(values).subscribe({
            next: () => this.router.navigateByUrl("/manage-rooms").then(() => 
                this.notificationService.setNotification(true, "Habitación creada exitosamente")),
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

    ngOnDestroy(): void {
        this.notificationService.clearNotification();
    }

}