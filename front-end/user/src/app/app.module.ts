import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule} from '@angular/material/paginator';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CategoryPipe } from './category.pipe';
import { OrderNumberPipe } from './ordernumber.pipe';
import { MatomoModule, MatomoRouteDataInterceptor, MatomoRouterModule } from 'ngx-matomo-client';
import { SignupComponent } from './signup/signup.component';
import { HistoryComponent } from './history/history.component';
import { ChatComponent } from './chat/chat.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';

const socketIoConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    auth:
      { token: 'some secret' }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProductComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    CategoryPipe,
    OrderNumberPipe,
    SignupComponent,
    HistoryComponent,
    ChatComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    MatomoModule
      .forRoot
      ({
        trackerUrl: 'http://localhost/matomo/matomo',
        siteId: '1',
      }),
    MatomoRouterModule.forRoot({
      interceptors: [MatomoRouteDataInterceptor],
      trackPageTitle: false,
    }),
    SocketIoModule.forRoot(socketIoConfig),
    NgxPaginationModule
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
