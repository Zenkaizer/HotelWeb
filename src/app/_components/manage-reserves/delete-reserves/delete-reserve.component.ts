import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReserveService } from "../../../_services/reserve.service";
import { NotificationService } from "../../../_services/notification.service";
import { Notification } from "../../../_models/notification";

@Component({
  selector: "app-delete-reserve",
  templateUrl: "./delete-reserve.component.html"
})
export class DeleteReserveComponent implements OnInit, OnDestroy {
  notification: Notification | null = null;
  reserveId: number;
  reserveDetails: any;

  constructor(
    private reserveService: ReserveService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reserveId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadReserveDetails();
  }

  loadReserveDetails(): void {
    this.reserveService.getReserve(this.reserveId).subscribe({
      next: (reserve) => {
        this.reserveDetails = reserve;
      },
      error: (error) => {
        this.notification = {
          message: "Ocurrió un error al cargar los detalles de la reserva.",
          success: false
        };
      }
    });
  }

  confirmDelete(): void {
    if (confirm(`¿Estás seguro que deseas eliminar la reserva ${this.reserveDetails.id}?`)) {
      this.reserveService.deleteReserve(this.reserveId).subscribe({
        next: () => {
          this.router.navigateByUrl("/manage-reserves").then(() =>
            this.notificationService.setNotification(true, "Reserva eliminada exitosamente")
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
  }

  closeNotification(): void {
    this.notification = null;
    this.notificationService.clearNotification();
  }

  cancelDelete(): void {
    this.router.navigateByUrl("/manage-reserves");
  }

  ngOnDestroy(): void {
    this.notificationService.clearNotification();
  }
}