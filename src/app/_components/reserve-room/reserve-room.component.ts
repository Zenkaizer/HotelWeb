import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../_services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve-room',
  templateUrl: './reserve-room.component.html'
})
export class ReserveRoomComponent implements OnInit {
  rooms: any[] = [];

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(
      (dataResponse) => {
        console.log(dataResponse);
        this.rooms = dataResponse;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  reserve(roomId: number): void {
    this.router.navigate(['/reserve-room', roomId]);
  }
}