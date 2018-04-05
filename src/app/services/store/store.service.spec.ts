import {TestBed, inject, async} from '@angular/core/testing';
import {StoreService} from './store.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {DataBaseService} from '../db/dataBase.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {firebaseConfig} from '../../app.module';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {UsersComponent} from '../../components/users/users.component';
import {ChatComponent} from '../../components/chat/chat.component';
import {LoginComponent} from '../../components/login/login.component';
import {AppRoutingModule} from '../../routes/app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {AgmCoreModule} from '@agm/core';

describe('StoreService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersComponent,
        ChatComponent,
        LoginComponent
      ],
      imports: [
        FormsModule,
        RouterModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        ReactiveFormsModule,
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

  it('should be created', inject([StoreService], (service: StoreService) => {
    expect(service).toBeTruthy();
  }));
});
