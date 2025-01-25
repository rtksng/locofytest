import { Routes } from '@angular/router';
import { LoginComponent } from './staff/login/login.component';
import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import { DashboardComponent } from './staff/dashboard/dashboard.component';
import { SignupComponent } from './customer/signup/signup.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'clientLogin', component: CustomerLoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'signup', component: SignupComponent }
];
