import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// Environment imports
import { environment } from '../../environments/environment'

// Model imports
import { Chat } from '../model/chat.model'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatModel: Chat = {
    senderId: '',
    receiverId: '',
    message: ''
  }

  constructor(private http: HttpClient) { }

  // Registration
  userList() {
    return this.http.get(environment.apiBaseUrl + '/usersList');
  }

  // Message display
  getMessage() {
    return this.http.get(environment.apiBaseUrl + '/getMessage');
  }

  // Send message
  sendMessage(message: Chat) {
    return this.http.post(environment.apiBaseUrl + '/sendMessage', message)
  }


}
