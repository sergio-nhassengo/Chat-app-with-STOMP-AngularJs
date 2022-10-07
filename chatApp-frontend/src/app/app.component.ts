import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  username = '';
  connectedUser = 'empty'
  isConnected=false;
  content: any;
  content2 = "Ola mundo";
  message = '';
  messageService: MessageService;

  ngOnInit() {
    this.messageService = new MessageService(new AppComponent());
  }

  public connect() {
    this.isConnected = true
    // this.content = this.username+" connected to server";
    this.messageService.connect(this.username);
  }

  public disconnect() {
    this.messageService.disconnect();
    this.isConnected = false;
  }

  public handleMessage(message) {
    this.content = message;
    console.log(this.content)
  }

  public sendMessage() {
    this.messageService.sendMessage(this.username, this.username, this.message);
  }
}
