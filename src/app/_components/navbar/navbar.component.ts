import { Component } from "@angular/core";
import { AccountService } from "../../_services/account.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html"
})
export class NavbarComponent {
    constructor(public accountService: AccountService, private router: Router) {
    }

    logout(): void {
        this.router.navigateByUrl("/").then(() => this.accountService.logout());
    }
}
