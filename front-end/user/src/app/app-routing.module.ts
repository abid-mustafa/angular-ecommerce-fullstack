import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthGuard } from './services/auth-guard.guard';
import { SignupComponent } from './signup/signup.component';
import { MatomoRouteData } from 'ngx-matomo-client';
import { HistoryComponent } from './history/history.component';
export const routes: Routes = [
  {
    path: 'signup',
    title: 'Signup | Ecommerce',
    component: SignupComponent,
    data: {
      matomo: {
        title: 'Signup',
      } as MatomoRouteData,
    },
  },
  {
    path: 'login',
    title: 'Loging | Ecommerce',
    component: LoginComponent,
    data: {
      matomo: {
        title: 'Login',
      } as MatomoRouteData,
    },
  },
  {
    path: 'products',
    title: 'Products | Ecommerce',
    component: ProductComponent,
    canActivate: [AuthGuard],
    data: {
      matomo: {
        title: 'Products',
      } as MatomoRouteData,
    },
  },
  {
    path: 'check-out',
    title: 'Check Out | Ecommerce',
    component: CheckOutComponent,
    canActivate: [AuthGuard],
    data: {
      matomo: {
        title: 'Checkout',
      } as MatomoRouteData,
    },
  },
  {
    path: 'history',
    title: 'My Order | Ecommerce',
    component: HistoryComponent,
    canActivate: [AuthGuard],
    data: {
      matomo: {
        title: 'History',
      } as MatomoRouteData,
    },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
