import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor (private authService: AuthService) {}

  canActivate() {
    // console.log(this.authService.logined);
    // return this.authService.logined;
    console.log(JSON.parse(localStorage.getItem('logged')));
    return JSON.parse(localStorage.getItem('logged'));
  }
}
