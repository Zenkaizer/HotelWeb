import { Notification } from "../../../_models/notification";
import { NotificationService } from "../../../_services/notification.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Reserve } from "../../../_models/reserve";
import { ReserveService } from "../../../_services/reserve.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-reserves-list",
    templateUrl: "./reserves-list.component.html"
})
export class ReserveListComponent implements OnInit, OnDestroy {

    reserves$ = new Array<Reserve>();
    notification: Notification | null = null;
    reservesPage: number = 1;

    constructor(
        private reserveService: ReserveService, 
        private notificationService: NotificationService, 
        private router: Router) { 
    }

    ngOnInit() {
        this.getNotificacion();
        this.getReserves();
        this.getCurrentNavigation();
    }

    getNotificacion(): void {
        this.notificationService.getNotification().subscribe({
            next: notification => this.notification = notification
        });
    }

    getReserves(): void {
        this.reserveService.getReserves().subscribe({
            next:(dataResponse) => {
                console.log(dataResponse);
              this.reserves$ = dataResponse;
            }, error:(e) =>{
                console.log(e);
            }
          }
        );
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