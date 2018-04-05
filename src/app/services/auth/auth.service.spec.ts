import {TestBed, inject, async} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {StoreService} from '../store/store.service';
import {DataBaseService} from '../db/dataBase.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {firebaseConfig} from '../../app.module';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {UsersComponent} from '../../components/users/users.component';
import {ChatComponent} from '../../components/chat/chat.component';
import {LoginComponent} from '../../components/login/login.component';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AppRoutingModule} from '../../routes/app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {ContextMenuComponent} from '../../components/chat/context-menu/context-menu.component';

describe('AuthService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersComponent,
        ChatComponent,
        LoginComponent,
        ContextMenuComponent
      ],
      imports: [
        FormsModule,
        RouterModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatButtonModule,
        MatListModule
        AppRoutingModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyB0QFcZaBbhdA6J_4DmE61W4bqwa93LmLU'
        })
      ],
      providers: [
        AuthService,
        StoreService,
        DataBaseService,
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        }
      ]
    })
      .compileComponents();
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  it('Method "signup" test', inject([AuthService], (service: AuthService) => {
    expect(service.signup);
  }));
  it('Method "logout" test', inject([AuthService], (service: AuthService) => {
    expect(service.logout);
  }));
  it('Method "login" test', inject([AuthService], (service: AuthService) => {
    expect(service.login);
  }));
});
