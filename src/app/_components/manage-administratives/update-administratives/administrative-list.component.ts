import { Notification } from "../../../_models/notification";
import { NotificationService } from "../../../_services/notification.service";
import { Router } from "@angular/router";
import { Administrative } from "../../../_models/administrative";
import { AdministrativeService } from "../../../_services/administrative.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "app-administrative-list",
    templateUrl: "./administrative-list.component.html"
})
export class AdministrativeListComponent implements OnInit, OnDestroy {

    administratives$ = new Array<Administrative>();
    notification: Notification | null = null;
    administrativesPage: number = 1;

    constructor(
        private administrativeService: AdministrativeService, 
        private notificationService: NotificationService, 
        private router: Router) { 
    }

    ngOnInit() {
        this.getNotificacion();
        this.getAdministratives();
        this.getCurrentNavigation();
    }

    getNotificacion(): void {
        this.notificationService.getNotification().subscribe({
            next: notification => this.notification = notification
        });
    }

    getAdministratives(): void {

        this.administrativeService.getAdministratives().subscribe({
            next:(dataResponse) => {
                console.log(dataResponse);
              this.administratives$ = dataResponse;
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

    ngOnDestroy() {
        this.notificationService.clearNotification();
    }
}