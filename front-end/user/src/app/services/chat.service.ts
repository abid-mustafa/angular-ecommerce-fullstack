import { lastValueFrom, Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    private chatSubject = new Subject<boolean>();
    private supportSubject = new Subject<boolean>();

    private chatObservable = this.chatSubject.asObservable();
    private supportObservable = this.supportSubject.asObservable();

    private url = 'http://localhost:3000/api/chats/';

    constructor(private http: HttpClient) { }

    // POST request message
    addMessage(data: any): any {
        return lastValueFrom(
            this.http.post<any>
                (this.url, data, { withCredentials: true })
        );
    }

    // GET request to get messages
    getChat(data: any): any {
        return lastValueFrom(
            this.http.get<any>
                (this.url + data, { withCredentials: true })
        );
    }

    getChatObservable() : Observable<boolean> {
        return this.chatObservable;
    }
    
    emitChatEvent(hideChat: boolean) {
        this.chatSubject.next(hideChat);
    }

    getSupportObservable() : Observable<boolean> {
        return this.supportObservable;
    }

    emitSupportEvent(hideChat: boolean) {
        this.supportSubject.next(hideChat);
    }
}
