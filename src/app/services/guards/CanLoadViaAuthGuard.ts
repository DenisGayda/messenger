import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import { get } from 'selenium-webdriver/http';

@Injectable()
export class CanLoadViaAuthGuard implements CanLoad {

  constructor (private authService: AuthService) {}

  canLoad() {
    // if (localStorage.getItem('logged') === 'true'){
    //   return true;
    // }
    // return false;
    console.log('can load',this.authService.logined.asObservable());
    return this.authService.logined.asObservable();
  }
}
