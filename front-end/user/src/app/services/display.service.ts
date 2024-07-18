import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DisplayService {
    private chatSubject = new Subject<boolean>();
    private cartSubject = new Subject<number>();
    private logoutSubject = new Subject();

    private chatObservable = this.chatSubject.asObservable();
    private cartObservable = this.cartSubject.asObservable();
    private logoutObservable = this.logoutSubject.asObservable();

    getChatObservable(): Observable<boolean> {
        return this.chatObservable;
    }

    emitChatEvent() {
        const showChat = JSON.parse(localStorage.getItem('showChat') || '0');
        this.chatSubject.next(showChat);
    }

    getCartObservable(): Observable<number> {
        return this.cartObservable;
    }

    emitCartEvent() {
        const showCart = JSON.parse(localStorage.getItem('showCart') || '0');
        this.cartSubject.next(showCart);
    }

    getLogoutObservable() {
        return this.logoutObservable;
    }

    emitLogoutEvent() {
        this.logoutSubject.next(null);
    }
}