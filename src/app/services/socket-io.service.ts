import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socket;

  constructor() { }
  socketConnection() {
    this.socket = io(environment.apiBaseUrl);
  }
}
