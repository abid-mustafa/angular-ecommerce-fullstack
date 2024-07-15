import { lastValueFrom, Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private url = 'http://localhost:3010/api/categories/';

  constructor(private http: HttpClient) { }

  // POST request to add order
  addCategory(data: any): any {
    return lastValueFrom(
      this.http.post<any>
        (this.url, data, { withCredentials: true })
    );
  }

  // GET request to get orders based on userid
  getCategories(): any {
    return lastValueFrom(
      this.http.get<any>
        (this.url, { withCredentials: true })
    );
  }
}
