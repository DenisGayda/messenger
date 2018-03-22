import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import { get } from 'selenium-webdriver/http';

@Injectable()
export class CanLoadViaAuthGuard implements CanLoad {

  constructor (private authService: AuthService) {}

  canLoad() {
    return this.authService.logined.asObservable();
    // console.log(localStorage.getItem('logged'));
    // return true;
  }
}
