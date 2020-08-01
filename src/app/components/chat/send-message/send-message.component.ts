import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// Service imports
import { ChatService } from 'src/app/services/chat.service';
import { SocketIoService } from 'src/app/services/socket-io.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  showSuccessMessage: boolean;
  serverErrorMessage;
  senderStoredId;
  receiverStoredId;
  messagePayload;

  constructor(
    public chatService: ChatService,
    private socketService: SocketIoService
  ) { }

  ngOnInit(): void {
  }
  
  message = new FormControl('', [Validators.required, Validators.minLength(1)]);

  onSendSubmit() {
    this.senderStoredId = sessionStorage.getItem('senderId');
    this.receiverStoredId = sessionStorage.getItem('receiverId');

    this.messagePayload = {
      "senderId": this.senderStoredId,
      "receiverId": this.receiverStoredId,
      "message": this.chatService.chatModel.message
    }

    //Socket msg sending
    this.socketService.sendSocketMessage(this.messagePayload);

    this.chatService.sendMessage(this.messagePayload).subscribe(
      res => {
        this.chatService.chatModel.message = "";
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessage = err.error.message;
          setTimeout(() => this.serverErrorMessage = false, 5000);
        } else {
          this.serverErrorMessage = "Something went wrong";
          setTimeout(() => this.serverErrorMessage = false, 5000);
        }
      }
    )
  }

  // To show/hide send message section
  IsMessageReady() {
    if (!!sessionStorage.getItem('receiverId')) {
      return true;
    } else {
      return false;
    }
  }
}