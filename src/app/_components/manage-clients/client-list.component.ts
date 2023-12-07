import { Notification } from "../../_models/notification";
import { NotificationService } from "../../_services/notification.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../../_models/client";
import { ClientService } from "../../_services/client.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-client-list",
    templateUrl: "./client-list.component.html"
})
export class ClientListComponent implements OnInit, OnDestroy {

    clients$: Array<Client> | undefined;
    notification: Notification | null = null;
    clientsPage: number = 1;

    constructor(
        private clientService: ClientService, 
        private notificationService: NotificationService, 
        private router: Router) { 
    }

    ngOnInit() {
        this.getNotificacion();
        this.getClients();
        this.getCurrentNavigation();
    }

    getNotificacion(): void {
        this.notificationService.getNotification().subscribe({
            next: notification => this.notification = notification
        });
    }

    getClients(): void {

        this.clientService.getClients().subscribe({
            next:(dataResponse) => {
              this.clients$ = dataResponse;
            }, error:(e) =>{}
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