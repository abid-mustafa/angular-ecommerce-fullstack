import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './products/products.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatListModule } from '@angular/material/list'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './categories/categories.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ChatComponent } from './chat/chat.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const socketIoConfig: SocketIoConfig = {
  url: 'http://localhost:3010',
  options: {
    auth:
      { token: 'some secret' }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    CategoryComponent,
    AddProductComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    SocketIoModule.forRoot(socketIoConfig),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
