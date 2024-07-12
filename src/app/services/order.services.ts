import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    getOrdersCount(customerId: number): any {
        return lastValueFrom(
            this.http.get<any>
                (this.url + 'orders-count/' + customerId, { withCredentials: true })
        );
    }

    // GET request to get orders based on userid
    getOrders(limit: number, offset: number, customerId: number): any {
        const params = new HttpParams().set('limit', limit).append('offset', offset).append('customerId', customerId);

        return lastValueFrom(
            this.http.get<any>
                (this.url, { params, withCredentials: true })
        );
    }

    getQuantity(data: any): any {
        return lastValueFrom(
            this.http.get<any>
                (this.url + 'get-quantity/' + data, { withCredentials: true })
        );
    }
}
