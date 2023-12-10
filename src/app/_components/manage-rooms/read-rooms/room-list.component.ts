import { Notification } from "../../../_models/notification";
import { NotificationService } from "../../../_services/notification.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Room } from "../../../_models/room";
import { RoomService } from "../../../_services/room.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-room-list",
    templateUrl: "./room-list.component.html"
})
export class RoomListComponent implements OnInit, OnDestroy {

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