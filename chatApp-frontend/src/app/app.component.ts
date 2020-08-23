import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = '';
  connectedUser = 'empty'
  isConnected=false;
  content = '';

  public connect() {
    this.isConnected = true
    this.content = this.username+" connected to server";
    console.log(this.username);
  }

  public disconnect() {
    this.isConnected = false;
  }
}
