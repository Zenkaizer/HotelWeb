import { Injectable } from "@angular/core";
import { 
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from "@angular/common/http";
import { Observable, take } from "rxjs";
import { AccountService } from "../_services/account.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    /**
     * Constructor of the class.
     * @param accountService AccountService to get the current account.
     */
    constructor(private accountService: AccountService) {
    }

    /**
     * This method intercepts the request to add the token.
     * @param req Request to intercept.
     * @param next Next handler.
     * @returns Returns the request with the token.
     */
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        this.accountService.currentAccount$.pipe(take(1)).subscribe({
            next: account => {
                if (account) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${account.token}`,
                        },
                    });
                    console.log(req.headers.get('Authorization'));
                }
            },
        });
        return next.handle(req);
    }

}