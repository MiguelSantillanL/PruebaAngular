import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private utilSvc: UtilService, private route: Router) {}

  canActivate() {
    const isLogged = Boolean(this.utilSvc.getToken());
    if (!isLogged) {
      this.route.navigate(['login']);
    }
    return isLogged;
  }
}
