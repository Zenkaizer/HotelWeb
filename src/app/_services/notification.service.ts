import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../_models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    private notificationSource = new BehaviorSubject<Notification | null>(null);

    constructor() { }

    getNotification() {
        return this.notificationSource.asObservable();
    }

    setNotification(success: boolean, message: string): void {
        this.notificationSource.next({ success: success, message: message});
    }

    clearNotification(): void {
        this.notificationSource.next(null);
    }

}