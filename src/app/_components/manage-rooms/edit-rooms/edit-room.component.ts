import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RoomService } from "../../../_services/room.service";
import { NotificationService } from "../../../_services/notification.service";
import { Notification } from "../../../_models/notification";

@Component({
  selector: "app-edit-room",
  templateUrl: "./edit-room.component.html"
})
export class EditRoomComponent implements OnInit, OnDestroy {

  editRoomForm: FormGroup = new FormGroup({});
  notification: Notification | null = null;
  roomId: number;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roomId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadRoomDetails();
  }

  initializeForm(): void {
    this.editRoomForm = this.formBuilder.group({
      individualBeds: ["", [
        Validators.required,
        Validators.min(1)
      ]],
      dualBeds: ["", [
        Validators.required,
        Validators.min(1)
      ]],
      haveBathroom: ["", [
        Validators.required
      ]],
      price: ["", [
        Validators.required,
        Validators.min(0)
      ]],
      maxCapacity: ["", [
        Validators.required,
        Validators.min(1)
      ]],
    });
  }

  loadRoomDetails(): void {
    this.roomService.getRoom(this.roomId).subscribe({
      next: (room) => {
        this.editRoomForm.patchValue(room);
      },
      error: (error) => {
        this.notification = {
            message: "Ocurrió un error al cargar los detalles de la habitación.",
            success: false
          };
      }
    });
  }

  updateRoom(): void {
    const values = { ...this.editRoomForm.value };
      
    this.roomService.updateRoom(this.roomId, values).subscribe({
      next: () => {
        this.router.navigateByUrl("/manage-rooms").then(() =>
          this.notificationService.setNotification(true, "Habitación actualizada exitosamente")
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
