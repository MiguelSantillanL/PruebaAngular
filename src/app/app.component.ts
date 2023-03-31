import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-2023';
  isLogged: Boolean = false;

  constructor(private router: Router, private utilSvc: UtilService) {
    this.isLogged = Boolean(this.utilSvc.getToken());
    console.log('isLogged', this.isLogged);
    this.utilSvc.isLogged.subscribe({
      next: (val) => {
        this.isLogged = val;
      },
    });
  }

  logout() {
    this.utilSvc.deleteToken();
    this.router.navigate(['login']);
  }
}
