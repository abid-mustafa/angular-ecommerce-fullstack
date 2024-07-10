import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    private url = 'http://localhost:3000/api/orders/';

    constructor(private http: HttpClient) { }

    // POST request to add order
    addOrder(data: any): any {
        return lastValueFrom(
            this.http.post<any>
                (this.url, data, { withCredentials: true })
        );
    }

    // GET request to get orders based on userid
    getOrders(data: any): any {
        return lastValueFrom(
            this.http.get<any>
                (this.url + data, { withCredentials: true })
        );
    }

    getQuantity(data: any): any {
        return lastValueFrom(
            this.http.get<any>
                (this.url + 'get-quantity/' + data, { withCredentials: true })
        );
    }
}
