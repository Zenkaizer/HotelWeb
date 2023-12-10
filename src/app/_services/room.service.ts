import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import {Room} from "../_models/room";
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
     * List of rooms.
     */
    rooms: Room[] = [];

    /**
     * Constructor of the class.
     * @param http HttpClient to make the requests to the API.
     */
    constructor(private http: HttpClient) {

    }

    /**
     * This method calls the API to get all the clients.
     * @returns All rooms in the database.
     */
    getRooms(): Observable<Room[]> {

        var rooms = this.http.get<Room[]>(this.baseUrl + "rooms")

        console.log(rooms);

        return rooms;
    }

    /**
     * This method calls the API to get a room by its ID.
     * @param id ID of the room to get.
     * @returns Returns the room with the given ID.
     */
    getRoom(id: number): Observable<Room> {
        return this.http.get<Room>(this.baseUrl + "rooms/" + id);
    }

    /**
     * This method calls the API to create a new room.
     * @param model All params of the new room.
     * @returns Returns the new room.
     */
    createRoom(model: any): Observable<User> {
        return this.http.post<User>(this.baseUrl + "rooms", model);
    }

    /**
     * This method calls the API to update a room.
     * @param id ID of the room to update.
     * @param model All params of the room to update.
     * @returns Returns the updated room.
     */
    updateRoom(id: number, model: any): Observable<Object> {
        console.log("Actualizando una habitacion");
        return this.http.put(this.baseUrl + "rooms/" + id, model);
    }

    /**
     * This method calls the API to delete a room.
     * @param id ID of the room to delete.
     * @returns Returns the deleted room.
     */
    deleteRoom(id: number): Observable<Object> {
        return this.http.delete(this.baseUrl + "rooms/" + id);
    }

}