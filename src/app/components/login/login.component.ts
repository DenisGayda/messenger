import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ILogin} from './ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  newUserForm: FormGroup;

  constructor(public authService: AuthService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Вход');

    this.newUserForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit({newLogin, email, password}: ILogin): void {
    if (newLogin) {
      this.authService.signupWithEmail(email, password, newLogin);
    }
    this.authService.loginWithEmail(email, password);
  }

  loginGoogle(){
    this.authService.loginWithGoogle();
  }
  
  signup(): void {
    this.newUserForm.addControl('newLogin', new FormControl('', Validators.required));
  }

  get newLogin():boolean{
    return !(this.newUserForm.controls.hasOwnProperty('newLogin'));
  }
  
}
