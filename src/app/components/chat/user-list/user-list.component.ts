import { Component, OnInit } from '@angular/core';

// Service imports
import { ChatService } from '../../../services/chat.service'
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [ChatService]
})

export class UserListComponent implements OnInit {
  usernameList;
  userListArr = [];
  receiverId;
  receiverName;
  senderName;
  siblingPayload;

  showSuccessMessage: boolean;
  serverErrorMessage;

  constructor(
    public chatService: ChatService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.displayUserList();
  }

  displayUserList() {
    this.chatService.userList().subscribe(
      res => {
        this.usernameList = res;

        for (let i = 0; i < this.usernameList.length; i++) {
          this.userListArr.push([this.usernameList[i].firstName + " " + this.usernameList[i].lastName, this.usernameList[i]._id])

          if (this.usernameList[i]._id == sessionStorage.getItem('senderId')) {
            this.senderName = this.usernameList[i].firstName + " " + this.usernameList[i].lastName;
          }
        }
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

  chatWithUser(index) {

    this.receiverId = this.usernameList[index]._id
    this.receiverName = this.usernameList[index].firstName + " " + this.usernameList[index].lastName;

    sessionStorage.setItem('receiverId', this.receiverId);
    sessionStorage.setItem('receiverName', this.receiverName);

    this.siblingPayload = {
      receiverId: this.receiverId,
      receiverName: this.receiverName
    }
    // Sending sibling data
    this.dataService.sendSiblingData(this.siblingPayload);
  }
}
