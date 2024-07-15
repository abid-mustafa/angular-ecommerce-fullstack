import { UserService } from './../services/user.service';
import { Socket } from 'ngx-socket-io';
import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  message: any;
  messages: any[] = [];
  chats: any[] = [];
  room: any;

  userid = JSON.parse(localStorage.getItem('userid') || '0');
  username = JSON.parse(localStorage.getItem('username') || '');

  constructor(private socket: Socket, private chatService: ChatService) { }

  async ngOnInit() {
    this.chats = await this.chatService.getChatRooms();

    this.socket.emit('joinRoomAdmin', this.chats);

    if (localStorage.getItem('current-room')) {
      this.room = JSON.parse(localStorage.getItem('current-room') || '');
      this.messages = await this.chatService.getChat(this.room);
    }

    this.socket.fromEvent('receive').subscribe((message: any) => {
      console.log('from socket==>', message);
      if (message.room ===  this.room) {
        this.messages.push(message);
      }
    });
  }

  async getChat(room: any) {
    this.messages = await this.chatService.getChat(room);
    this.room = room;
    localStorage.setItem('current-room', JSON.stringify(room));
    console.log(this.messages);
  }

  send() {
    if (this.message.trim()) {

      const newMessage = {
        senderId: this.userid,
        room: this.room,
        text: this.message,
      };

      this.socket.emit('send', newMessage);
      this.messages.push(newMessage);
      this.message = '';
      this.chatService.addMessage(newMessage);
    }
  }
}
