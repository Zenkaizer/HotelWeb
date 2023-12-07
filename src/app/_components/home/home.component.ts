import { Component, OnDestroy, OnInit } from "@angular/core";
import { Notification } from "../../_models/notification";
import { Account } from "../../_models/account";
import { AccountService } from "../../_services/account.service";
import { NotificationService } from "../../_services/notification.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    account: Account | null = null;
    notification: Notification | null = null;

    constructor(
        private accountService: AccountService, 
        private notificationService: NotificationService) { 
    }

    ngOnInit(): void {
        this.getNotification();
        
    }
    
    getNotification(): void{
        this.notificationService.getNotification().subscribe({
            next: notification => this.notification = notification
        });
    }

    loadAccount(): void {
        this.accountService.currentAccount$.subscribe({
            next: account => {
                if (account) {
                    this.account = account;
                }
            }
        });
    }

    closeAlert(): void {
        this.notification = null;
    }

    ngOnDestroy(): void {
        this.notificationService.clearNotification();
    }
}