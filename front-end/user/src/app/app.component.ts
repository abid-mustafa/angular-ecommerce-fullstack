import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-httpClient';
  hideChat = true;
  hideSupportIcon = true;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    const chatObservable = this.chatService.getChatObservable();

    chatObservable.subscribe((data) => {
      this.hideChat = data;
    });

    const supportObservable = this.chatService.getSupportObservable();

    supportObservable.subscribe((data) => {
      this.hideSupportIcon = data;
    });
  }
}
