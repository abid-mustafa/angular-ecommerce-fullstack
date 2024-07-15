import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private url = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient) { }

  signup(data: any): any {
    return lastValueFrom(
      this.http.post
        (this.url + 'signup',
          data,
          { withCredentials: true })
    );
  }

  login(data: any): any {
    return lastValueFrom(
      this.http.post
        (this.url + 'login',
          data,
          { withCredentials: true })
    );
  }

  logout(): any {

    return lastValueFrom(
      this.http.get
      (this.url + 'logout',
        { withCredentials: true })
    );
  }
}
