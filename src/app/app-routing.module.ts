import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './users/user-layout/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AddMenuComponent } from './admin/add-menu/add-menu.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { CartComponent } from './users/user-layout/cart/cart.component';
import { UserLayoutComponent } from './users/user-layout/user-layout/user-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'sign-in', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'add-menu',
        component: AddMenuComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
    ],
  },
  {
    path: 'user/:id',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
