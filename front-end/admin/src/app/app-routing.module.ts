import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './categories/categories.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent,canActivate: [AuthGuard]},
  {path: 'chats', component: ChatComponent,canActivate: [AuthGuard]},
  {path: 'products', component: ProductComponent,canActivate: [AuthGuard]},
  {path: 'categories', component: CategoryComponent,canActivate: [AuthGuard]},
  {path: 'add-product', component: AddProductComponent,canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
