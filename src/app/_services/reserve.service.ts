import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import {Reserve} from "../_models/reserve";
import { User } from "../_models/user";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({ 
    providedIn: "root" 
})

export class ReserveService {

    /**
     * Base URL of the API.
     */
    baseUrl = environment.apiUrl;
    /**
     * List of reserves.
     */
    reserve: Reserve[] = [];

    /**
     * Constructor of the class.
     * @param http HttpClient to make the requests to the API.
     */
    constructor(private http: HttpClient) {

    }

    /**
     * This method calls the API to get all the clients.
     * @returns All reserves in the database.
     */
    getReserves(): Observable<Reserve[]> {

        var reserves = this.http.get<Reserve[]>(this.baseUrl + "reserves")

        console.log(reserves);

        return reserves;
    }

    /**
     * This method calls the API to get a reserve by its ID.
     * @param id ID of the reserve to get.
     * @returns Returns the reserve with the given ID.
     */
    getReserve(id: number): Observable<Reserve> {
        return this.http.get<Reserve>(this.baseUrl + "reserves/" + id);
    }

    /**
     * This method calls the API to create a new reserve.
     * @param model All params of the new reserve.
     * @returns Returns the new reserve.
     */
    createReserve(model: any): Observable<User> {
        return this.http.post<User>(this.baseUrl + "reserves", model);
    }

    /**
     * This method calls the API to update a reserve.
     * @param id ID of the reserve to update.
     * @param model All params of the reserve to update.
     * @returns Returns the updated reserve.
     */
    updateReserve(id: number, model: any): Observable<Object> {
        return this.http.put(this.baseUrl + "reserves/" + id, model);
    }

    /**
     * This method calls the API to delete a reserve.
     * @param id ID of the reserve to delete.
     * @returns Returns the deleted reserve.
     */
    deleteReserve(id: number): Observable<Object> {
        return this.http.delete(this.baseUrl + "reserves/" + id);
    }

}