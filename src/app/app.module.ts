import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './users/user-layout/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './admin/layout/side-bar/side-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AddMenuComponent } from './admin/add-menu/add-menu.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { GraphComponent } from './admin/widgets/graph/graph.component';

//firebase
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//interceptors
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

//environment
import { environment } from '../environments/environment';

//services
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

//angular-material and flex-layout
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

//high charts
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './admin/widgets/card/card.component';
import { UserService } from './services/user.service';
import { MenuService } from './services/menu.service';
import { CartComponent } from './users/user-layout/cart/cart.component';
import { UserLayoutComponent } from './users/user-layout/user-layout/user-layout.component';
import { CartService } from './services/cart.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrdersService } from './services/orders.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    AddMenuComponent,
    LayoutComponent,
    OrdersComponent,
    GraphComponent,
    CardComponent,
    CartComponent,
    UserLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    HighchartsChartModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthService,
    AuthGuard,
    UserService,
    MenuService,
    CartService,
    OrdersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
