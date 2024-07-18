import { Component } from '@angular/core';
import { DisplayService } from './services/display.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showChat: boolean = JSON.parse(localStorage.getItem('showChat') || '0');
  showFooter = false;
  showNavbar = false;

  constructor(private displayService: DisplayService, private router: Router) { }

  ngOnInit() {
    this.displayService.getLogoutObservable().subscribe(data => {
      this.showChat = false;
      this.showFooter = false;
      this.showNavbar = false;
    });

    // subscribe to router events observable and manage routes 
    this.router.events.subscribe((data: any) => {
      // if user data in local storage, assume user logged in
      if (localStorage.getItem('username') && localStorage.getItem('userid')) {
        // update boolean variable to show navbar
        this.showFooter = true;
        this.showNavbar = true;
      }
      else {
        // update boolean variable to hide navbar
        this.showFooter = false;
        this.showChat = false;
      }
    });

    this.displayService.getChatObservable().subscribe(data => this.showChat = data);
  }

  updateChat() {
    let showChat: boolean = JSON.parse(localStorage.getItem('showChat') || '0');
    showChat = !showChat;
    localStorage.setItem('showChat', JSON.stringify(showChat));

    this.displayService.emitChatEvent();
  }
}
