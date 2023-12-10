import { Client } from './client';
import { Room } from './room';  

export interface Reserve {
  id: number;
  user: Client;
  room: Room;
  reserveDateTime: Date;
  arriveDateTime: Date;
  leaveDateTime: Date;
  confirmed: boolean;
}