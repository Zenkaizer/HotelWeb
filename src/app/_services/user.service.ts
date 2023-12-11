import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { User } from "../_models/user";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class UserService {

    /**
     * Base URL of the API.
     */
    baseUrl = environment.apiUrl;

    /**
     * Constructor of the class.
     * @param http HttpClient to make the requests to the API.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * This method calls the API to get the current user.
     * @returns Returns the current user.
     */
    getCurrentUser(id: number): Observable<User> {

        return this.http.get<User>(this.baseUrl + "auth/user/" + id);
    }

    /**
     * This method calls the API to update the current user.
     * @param model All params of the user to update.
     * @returns Returns the updated user.
     */
    updateCurrentUser(model: any): Observable<Object> {
        return this.http.post(this.baseUrl + "auth/profile", model);
    }

}
