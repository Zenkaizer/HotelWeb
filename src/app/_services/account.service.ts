import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { Account } from "../_models/account";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AccountService {

    /**
     * Base URL of the API.
     */
    baseUrl = environment.apiUrl;
    /**
     * List of accounts.
     */
    private currentAccountSource = new BehaviorSubject<Account | null>(null);
    /**
     * Current account.
     */
    currentAccount$ = this.currentAccountSource.asObservable();

    /**
     * Constructor of the class.
     * @param http HttpClient to make the requests to the API.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * This method calls the API to login an account.
     * @param model All params of the account to login.
     * @returns Returns the logged account.
     */
    login(model: any): Observable<void> {

        return this.http.post<Account>(this.baseUrl + "auth/login", model).pipe(
            map((response: Account) => {
                const account = response;
                if (account) {
                    this.setCurrentAccount(account);
                }
            })
               
        );
    }

    /**
     * This method calls the API to register an account.
     * @param model All params of the account to register.
     * @returns Returns the registered account.
     */
    register(model: any): Observable<void> {
        return this.http.post<Account>(this.baseUrl + "auth/register", model).pipe(
            map((response: Account) => {
                const account = response;
                if (account) {
                    this.setCurrentAccount(account);
                }
            })
        );
    }
    
    /**
     * This method logout the current account.
     */
    logout(): void {
        localStorage.removeItem("account");
        this.currentAccountSource.next(null);
    }

    /**
     * This method calls the API to logout the current account.
     * @param account Current account.
     */
    setCurrentAccount(account: Account): void {
        localStorage.setItem("account", JSON.stringify(account));
        this.currentAccountSource.next(account);
    }

}