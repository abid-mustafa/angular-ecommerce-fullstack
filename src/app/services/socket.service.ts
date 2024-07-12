// src/app/socket.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:3000',
  auth: {
    token: 'some secret'
  }
};

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Initialize the socket connection
    this.socket = io(
      environment.SOCKET_ENDPOINT,
      {
        auth: {
          token: environment.auth.token
        }
      }
    );
  }

  // Emit an event
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  // Listen for an event
  on(eventName: string, callback: (...args: any[]) => void) {
    this.socket.on(eventName, callback);
  }
  // Disconnect the socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}