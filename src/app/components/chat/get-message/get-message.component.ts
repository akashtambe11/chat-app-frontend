import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../../services/chat.service'
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-get-message',
  templateUrl: './get-message.component.html',
  styleUrls: ['./get-message.component.css'],
  providers: [ChatService]
})
export class GetMessageComponent implements OnInit {
  userMsgList;
  msgArray = [];
  senderIdStored = sessionStorage.getItem('senderId');
  receiverIdStored = sessionStorage.getItem('receiverId');
  receiverIdName = sessionStorage.getItem('receiverName')
  displayRecipientName;
  response;

  displayDashboardImg = false;
  showSuccessMessage: boolean;
  serverErrorMessage;


  constructor(public chatService: ChatService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentData.subscribe(data => {
    
      this.response = data;

      if (this.response.receiverId == sessionStorage.getItem('receiverId')) {
        this.msgArray = []; // To clear the msgArray after selecting another user
        this.displayRecipientName = this.response.receiverName;
        this.displayPersonalMsg()

      } else {
        console.log('no');
        this.displayDashboardImg = true;

      }
    })
  }

  displayPersonalMsg() {
    this.chatService.getMessage().subscribe(
      res => {
        this.userMsgList = res;
        for (var i = 0; i < this.userMsgList.result.length; i++) {

          if (((this.userMsgList.result[i].senderId == sessionStorage.getItem('senderId')) && (this.userMsgList.result[i].receiverId == sessionStorage.getItem('receiverId'))) || ((this.userMsgList.result[i].receiverId == sessionStorage.getItem('senderId')) && (this.userMsgList.result[i].senderId == sessionStorage.getItem('receiverId')))) {
            this.msgArray.push(this.userMsgList.result[i])
          }
        }
        // console.log(this.userMsgList);
        // console.log(this.msgArray);
      },

      err => {
        if (err.status === 422) {
          this.serverErrorMessage = err.error.message;
          setTimeout(() => this.serverErrorMessage = false, 5000);
        }
        else {
          this.serverErrorMessage = "Something went wrong";
          setTimeout(() => this.serverErrorMessage = false, 5000);
        }
      }
    )
  }
}