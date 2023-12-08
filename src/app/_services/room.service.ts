import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { Client } from "../_models/client";
import { User } from "../_models/user";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({ 
    providedIn: "root" 
})

export class RoomService {

    /**
     * Base URL of the API.
     */
    baseUrl = environment.apiUrl;
    /**
     * List of clients.
     */
    clients: Client[] = [];

    /**
     * Constructor of the class.
     * @param http HttpClient to make the requests to the API.
     */
    constructor(private http: HttpClient) {

    }

    /**
     * This method calls the API to get all the clients.
     * @returns All clients in the database.
     */
    getClients(): Observable<Client[]> {

        var clientes = this.http.get<Client[]>(this.baseUrl + "clients")

        console.log(clientes);

        return clientes;
    }

    /**
     * This method calls the API to get a client by its ID.
     * @param id ID of the client to get.
     * @returns Returns the client with the given ID.
     */
    getClient(id: number): Observable<Client> {
        return this.http.get<Client>(this.baseUrl + "clients/" + id);
    }

    /**
     * This method calls the API to create a new client.
     * @param model All params of the new client.
     * @returns Returns the new client.
     */
    createClient(model: any): Observable<User> {
        return this.http.post<User>(this.baseUrl + "clients", model);
    }

    /**
     * This method calls the API to update a client.
     * @param id ID of the client to update.
     * @param model All params of the client to update.
     * @returns Returns the updated client.
     */
    updateClient(id: number, model: any): Observable<Object> {
        return this.http.put(this.baseUrl + "clients/" + id, model);
    }

    /**
     * This method calls the API to delete a client.
     * @param id ID of the client to delete.
     * @returns Returns the deleted client.
     */
    deleteClient(id: number): Observable<Object> {
        return this.http.delete(this.baseUrl + "clients/" + id);
    }

}