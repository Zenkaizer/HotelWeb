import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomService } from "../../../_services/room.service";
import { NotificationService } from "../../../_services/notification.service";
import { Notification } from "../../../_models/notification";

@Component({
  selector: "app-delete-room",
  templateUrl: "./delete-room.component.html"
})
export class DeleteRoomComponent implements OnInit, OnDestroy {
  notification: Notification | null = null;
  roomId: number;
  roomDetails: any;

  constructor(
    private roomService: RoomService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roomId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadRoomDetails();
  }

  loadRoomDetails(): void {
    this.roomService.getRoom(this.roomId).subscribe({
      next: (room) => {
        this.roomDetails = room;
      },
      error: (error) => {
        this.notification = {
            message: "Ocurrió un error al cargar los detalles de la habitación.",
            success: false
          };
      }
    });
  }

  confirmDelete(): void {
    if (confirm(`¿Estás seguro que deseas eliminar la habitación ${this.roomDetails.id}?`)) {
      this.roomService.deleteRoom(this.roomId).subscribe({
        next: () => {
          this.router.navigateByUrl("/manage-rooms").then(() =>
            this.notificationService.setNotification(true, "Habitación eliminada exitosamente")
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
    this.router.navigateByUrl("/manage-rooms");
  }

  ngOnDestroy(): void {
    this.notificationService.clearNotification();
  }
}