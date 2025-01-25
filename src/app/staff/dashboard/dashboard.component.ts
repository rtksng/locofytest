import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private inactivityTimeout: any;
  private readonly AUTO_LOGOUT_TIME_WARNING = 10000;
  private readonly AUTO_LOGOUT_TIME = 5000;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit() {
    setTimeout(() => this.inactivityTimeoutWarning(), this.AUTO_LOGOUT_TIME_WARNING);
  }

  inactivityTimeoutWarning() {
    console.warn("You will be logged out in 5 minutes");
    this.inactivityTimeout = setTimeout(() => this.resetInactivityTimer(), this.AUTO_LOGOUT_TIME);
  }

  resetInactivityTimer() {
    this.clearInactivityTimer();
    this.logout()
  }

  clearInactivityTimer() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
