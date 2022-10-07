import { AppComponent } from './app.component';
declare var SockJS;
declare var Stomp;


export class MessageService {

  url: string = 'http://localhost:8380';
  stompClient: any;

  appComponent: AppComponent;

  constructor(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  connect(username: string) {
    let ws = new SockJS(this.url + "/websocket");
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({ username: username }, function (frame) {
      _this.stompClient.subscribe('/topic/positions', function (message) {

      });

      _this.stompClient.subscribe(`/user/${username}/deal`, function (message) {
      });

      _this.sendConnection(username, 'connected to server');

    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  onMessageReceived(message) {
    console.log(message);
  }

  sendConnection(username, message) {
    var text = username + message;
    this.sendBroadcast({ 'from': 'server', 'text': text });

    // for first time or last time, list active users:
    // updateUsers(username);
  }

  sendBroadcast(json) {
    this.stompClient.send("/app/broadcast", {}, JSON.stringify(json));
  }

  sendMessage(from, to, message) {
    this.stompClient.send(
      "/app/chat",
      { 'sender': from },
      JSON.stringify({ 'from': from, 'text': message, 'recipient': to })
    );
  }

  updateUsers(username: string) {

  }
}
