import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ReserveService } from "../../../_services/reserve.service";
import { NotificationService } from "../../../_services/notification.service";
import { Notification } from "../../../_models/notification";

@Component({
  selector: "app-edit-reserve",
  templateUrl: "./edit-reserve.component.html"
})
export class EditReserveComponent implements OnInit, OnDestroy {

  editReserveForm: FormGroup = new FormGroup({});
  notification: Notification | null = null;
  reserveId: number;

  constructor(
    private formBuilder: FormBuilder,
    private reserveService: ReserveService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reserveId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadReserveDetails();
  }

  initializeForm(): void {
    this.editReserveForm = this.formBuilder.group({
      checkIn: ["", [
        Validators.required
      ]],
      checkOut: ["", [
        Validators.required
      ]],
      confirmed: [false]
    });
  }

  loadReserveDetails(): void {
    this.reserveService.getReserve(this.reserveId).subscribe({
      next: (reserve) => {
        this.editReserveForm.patchValue(reserve);
      },
      error: (error) => {
        this.notification = {
            message: "Ocurrió un error al cargar los detalles de la reserva.",
            success: false
          };
      }
    });
  }

  updateReserve(): void {
    const values = { ...this.editReserveForm.value };

    this.reserveService.updateReserve(this.reserveId, values).subscribe({
      next: () => {
        this.router.navigateByUrl("/manage-reserves").then(() =>
          this.notificationService.setNotification(true, "Reserva actualizada exitosamente")
        );
      },
      error: (error) => {
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