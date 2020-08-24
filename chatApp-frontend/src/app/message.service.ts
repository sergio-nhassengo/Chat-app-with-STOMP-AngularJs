import { AppComponent } from './app.component';
declare var SockJS;
declare var Stomp;


export class MessageService {

  url: string = 'http://localhost:8080';
  stompClient: any;

  appComponent: AppComponent;

  constructor(appComponent: AppComponent){
      this.appComponent = appComponent;
  }

  connect(username: string) {
    let ws = new SockJS(this.url + "/chat");
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({ username: username }, function (frame) {
      _this.stompClient.subscribe('/topic/broadcast', function () {
        // _this.updateUsers(username);
      });
      _this.stompClient.subscribe('/topic/active', function (message) {
        _this.onMessageReceived(message);
      });
      _this.stompClient.subscribe('/user/queue/messages', function (message) {
        _this.onMessageReceived(message);
      });

      _this.sendConnection(username, 'connected to server');

    });
  }

  disconnect() {
    if(this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    this.appComponent.handleMessage(JSON.parse(message.body));
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
      {'sender': from}, 
      JSON.stringify({'from': from, 'text': message, 'recipient': to})
    );
  }

  updateUsers(username: string) {

  }
}
