import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  hide = true;
  showSuccessMessage: boolean;
  serverErrorMessage;
  senderStoredId;
  receiverStoredId;
  messagePayload;

  clearText;

  constructor(private formBuilder: FormBuilder,
    public chatService: ChatService,
    private router: Router) { }

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
    

    // this.chatService.chatModel.message = "";
    this.chatService.sendMessage(this.messagePayload).subscribe(
      res => {
        console.log("Message Send From FRONT-END");
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

  IsMessageReady() {
    if(!!sessionStorage.getItem('receiverId')){
      return true;
    } else {
      return false;
    }
  }

}