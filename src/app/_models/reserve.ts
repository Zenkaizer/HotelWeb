import { Client } from './client';
import { Room } from './room';  

export interface Reserve {

  id: number;
  roomId: number;
  firstName: string;
  lastName: string;
  checkIn: string;
  checkOut: String;
  price: String;
  confirmed: boolean;
}