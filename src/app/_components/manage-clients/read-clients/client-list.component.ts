import { Notification } from "../../../_models/notification";
import { NotificationService } from "../../../_services/notification.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../../../_models/client";
import { ClientService } from "../../../_services/client.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-client-list",
    templateUrl: "./client-list.component.html"
})
export class ClientListComponent implements OnInit, OnDestroy {

    clients$ = new Array<Client>();
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
                console.log(dataResponse);
              this.clients$ = dataResponse;
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

    deleteClient(id: number): void {
        this.clientService.deleteClient(id).subscribe({
            next: () => {
                this.getClients();
                this.notificationService.setNotification(true, "Cliente eliminado correctamente");
            },
            error: (error) => {
                this.notificationService.setNotification(false, "Ha ocurrido un problema al eliminar el cliente");
            }
        });
    }

}