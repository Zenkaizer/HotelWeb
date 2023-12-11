import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../_services/room.service';
import { Router } from '@angular/router';
import { Room } from '../../_models/room';
import { NotificationService } from '../../_services/notification.service';
import { Notification } from '../../_models/notification';
@Component({
  selector: 'app-reserve-room',
  templateUrl: './reserve-room.component.html'
})
export class ReserveRoomComponent implements OnInit {

    rooms$ = new Array<Room>();
    notification: Notification | null = null;
    roomsPage: number = 1;

    constructor(
        private roomService: RoomService, 
        private notificationService: NotificationService, 
        private router: Router) { 
    }

    ngOnInit() {
        this.getNotificacion();
        this.getRooms();
        this.getCurrentNavigation();
    }

    getNotificacion(): void {
        this.notificationService.getNotification().subscribe({
            next: notification => this.notification = notification
        });
    }

    getRooms(): void {

        console.log("getRooms");

        this.roomService.getRooms().subscribe({
            next:(dataResponse) => {
                console.log(dataResponse);
                this.rooms$ = dataResponse.filter(room => !room['deleted']);
            }, error:(e) =>{
                console.log(e);
            }
          }
        );
    }

    get filteredRooms(): Room[] {
        return this.rooms$;
    }

    getCurrentNavigation(): void {
        this.router.getCurrentNavigation();
    }

    closeNotification(): void {
        this.notification = null;
        this.notificationService.clearNotification();
    }

    ngOnDestroy(): void {
        this.notificationService.clearNotification();
    }

}