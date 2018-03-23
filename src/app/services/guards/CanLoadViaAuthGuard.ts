import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import { get } from 'selenium-webdriver/http';
import { JsonPipe } from '@angular/common';

@Injectable()
export class CanLoadViaAuthGuard implements CanLoad {

  constructor (private authService: AuthService) {}

  canLoad() {
    // if (localStorage.getItem('logged') === 'true'){
    //   return true;
    // }
    // return false;
    // console.log()
    console.log(JSON.parse(localStorage.getItem('logged'));
    return JSON.parse(localStorage.getItem('logged'));
    
    // console.log(this.authService.logined);
    // return this.authService.logined;
  }
}
