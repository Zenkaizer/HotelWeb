import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AccountService } from "../_services/account.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AdministrativeAuthGuard {

    constructor(private accountService: AccountService, private router: Router) {
    }

    canActivate(): Observable<boolean> {

        return this.accountService.currentAccount$.pipe(
            map(account => {
                if (account && account.role === 'ADMINISTRATIVE') {
                    return true;
                }
                this.router.navigateByUrl('/').then(() => {
                });
                return false;
            })
        )      
    }
}