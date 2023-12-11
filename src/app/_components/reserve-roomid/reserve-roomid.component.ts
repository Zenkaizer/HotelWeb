import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "../../_services/account.service";
import { ReserveService } from "../../_services/reserve.service";
import { NotificationService } from "../../_services/notification.service";
import { Notification } from "../../_models/notification";

@Component({
  selector: "app-reserve-roomid",
  templateUrl: "./reserve-roomid.component.html"
})
export class ReserveRoomidComponent implements OnInit, OnDestroy {

  reserveForm: FormGroup = new FormGroup({});
  notification: Notification | null = null;
  roomId: number;
  clientEmail: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private reserveService: ReserveService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roomId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadClientEmail();
  }

  initializeForm(): void {
    this.reserveForm = this.formBuilder.group({
      checkIn: ["", [
        Validators.required
      ]],
      checkOut: ["", [
        Validators.required
      ]],
    });
  }

  loadClientEmail(): void {
    this.accountService.currentAccount$.subscribe(account => {
      if (account) {
        this.clientEmail = account.email;
      }
    });
  }

  onSubmit(): void {
    const values = { ...this.reserveForm.value, roomId: this.roomId, clientEmail: this.clientEmail };

    console.log('Valores del formulario:', values);

    this.reserveService.createReserve(values).subscribe({
      next: () => {
        this.router.navigateByUrl("/").then(() =>
          this.notificationService.setNotification(true, "Reserva creada exitosamente")
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