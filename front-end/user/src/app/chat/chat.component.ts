import { Socket } from 'ngx-socket-io';
import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  message: any;
  messages: any[] = [];
  userid: any
  username: any;

  constructor(private socket: Socket, private chatService: ChatService) { }

  async ngOnInit() {
    if (localStorage.getItem('username') && localStorage.getItem('userid')) {
      this.username = JSON.parse(localStorage.getItem('username') || '');
      this.userid = JSON.parse(localStorage.getItem('userid') || '0');

      this.messages = await this.chatService.getChat(this.username);

      this.socket.emit('joinRoomUser', this.username);

      this.socket.fromEvent('receive').subscribe((message) => {
        this.messages.push(message);
      });
    }
  }

  send() {
    if (this.message.trim()) {
      const newMessage = {
        senderId: this.userid,
        room: this.username,
        text: this.message,
        timestamp : new Date().toISOString().slice(0, 19).replace('T', ' ')
      };

      this.socket.emit('send', newMessage);
      this.messages.push(newMessage);
      this.message = '';
      this.chatService.addMessage(newMessage);
    }
  }

  closeChat() {
    this.chatService.emitChatEvent(true);
  }
}
