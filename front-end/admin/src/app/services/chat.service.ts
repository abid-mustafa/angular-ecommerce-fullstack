import { lastValueFrom, Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    private url = 'http://localhost:3010/api/chats/';

    constructor(private http: HttpClient) { }

    // POST request to add order
    addMessage(data: any): any {
        return lastValueFrom(
            this.http.post<any>
                (this.url, data, { withCredentials: true })
        );
    }

    // GET request to get orders based on userid
    getChat(data: any): any {
        return lastValueFrom(
            this.http.get<any>
                (this.url + data, { withCredentials: true })
        );
    }

    // GET request to get orders based on userid
    getChatRooms(): any {
        return lastValueFrom(
            this.http.get<any>
                (this.url + 'get-rooms', { withCredentials: true })
        );
    }
}
