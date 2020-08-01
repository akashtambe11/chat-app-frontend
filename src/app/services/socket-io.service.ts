import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs'

// Environment imports
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  // Socket connection to URI
  private socket = io(environment.apiBaseUrl);

  constructor() { }

  sendSocketMessage(data) {
    this.socket.emit('send', data);
  }

  // Displaying new message in get-message component
  displayNewMessage() {
    let observable = new Observable<{ message }>(observer => {
      this.socket.on('receive message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }
}
