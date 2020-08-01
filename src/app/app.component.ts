import { Component } from '@angular/core';

// Service imports
import { SocketIoService } from './services/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'chatapp';

  constructor(private socketService: SocketIoService) { }
  ngOnInit() {

    // Socket connection
    this.socketService

  }
}
