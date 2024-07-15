import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    private url = 'http://localhost:3000/api/products/';

    constructor(private http: HttpClient) { }

    getProducts(): any {
        return lastValueFrom(
            this.http.get<any[]>
                (this.url, { withCredentials: true })
        );
    }
}
