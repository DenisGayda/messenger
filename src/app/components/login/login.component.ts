import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ILogin} from './ILogin';
import { LocalStorage } from '../../decorators/local-storage.decorator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  newUserForm: FormGroup;
  @LocalStorage newLogin:boolean; 

  constructor(public authService: AuthService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Вход');

    this.newUserForm = new FormGroup({
      login: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit({login, email, password}: ILogin): void {
    console.log(login);
    if (login) {
      this.authService.signupWithEmail(email, password, login);
      return;
    }
    this.authService.loginWithEmail(email, password);
  }

  loginGoogle(){
    this.authService.loginWithGoogle();
  }
  
  signup(): void {
    this.newLogin = true;
  }
}
