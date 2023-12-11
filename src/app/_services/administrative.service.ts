import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { User } from "../_models/user";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Administrative } from "../_models/administrative";

@Injectable({ 
    providedIn: "root" 
})

export class AdministrativeService {

    /**
     * Base URL of the API.
     */
    baseUrl = environment.apiUrl;
    /**
     * List of administratives.
     */
    administratives: Administrative[] = [];

    /**
     * Constructor of the class.
     * @param http HttpClient to make the requests to the API.
     */
    constructor(private http: HttpClient) {

    }

    /**
     * This method calls the API to get all the administratives.
     * @returns All administratives in the database.
     */
    getAdministratives(): Observable<Administrative[]> {

        var administratives = this.http.get<Administrative[]>(this.baseUrl + "administratives")
        return administratives;
    }

    /**
     * This method calls the API to get a administrative by its ID.
     * @param id ID of the administrative to get.
     * @returns Returns the administrative with the given ID.
     */
    getAdministrative(id: number): Observable<Administrative> {
        return this.http.get<Administrative>(this.baseUrl + "administratives/" + id);
    }

    /**
     * This method calls the API to create a new administrative.
     * @param model All params of the new administrative.
     * @returns Returns the new administrative.
     */
    createAdministrative(model: any): Observable<User> {
        return this.http.post<User>(this.baseUrl + "administratives/new-administrative", model);
    }

    /**
     * This method calls the API to update a administrative.
     * @param id ID of the administrative to update.
     * @param model All params of the administrative to update.
     * @returns Returns the updated administrative.
     */
    updateAdministrative(id: number, model: any): Observable<Object> {
        return this.http.put(this.baseUrl + "administratives/" + id, model);
    }

    /**
     * This method calls the API to delete a administrative.
     * @param id ID of the administrative to delete.
     * @returns Returns the deleted administrative.
     */
    deleteAdministrative(id: number): Observable<Object> {
        return this.http.delete(this.baseUrl + "administratives/" + id);
    }

}