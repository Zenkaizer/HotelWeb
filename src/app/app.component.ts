import { Component } from '@angular/core';
import { Account } from './_models/account';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotelAngular';

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.setCurrentAccount();
  }

  setCurrentAccount() {
    const accountStr = localStorage.getItem('account');
    if (!accountStr) return;
    const account: Account = JSON.parse(accountStr);
    this.accountService.setCurrentAccount(account);
  }

}
