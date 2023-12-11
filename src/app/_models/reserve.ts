import { Client } from './client';
import { Room } from './room';  

export interface Reserve {

  roomId: number;
  clientRut: String;
  firstName: string;
  lastName: string;
  checkIn: string;
  chekOut: String;
  price: number;
  confirmed: boolean;
}