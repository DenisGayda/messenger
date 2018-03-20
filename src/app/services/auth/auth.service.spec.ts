import {TestBed, inject, async} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {Router, RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {StoreService} from '../store/store.service';
import {DbService} from '../db/db.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyRoutesModule} from '../../routes/my-routes.module';
import {UsersComponent} from '../../users/users.component';
import {ChatComponent} from '../../chat/chat.component';
import {firebaseConfig} from '../../app.module';
import {LoginComponent} from '../../login/login.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';

describe('AuthService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, ChatComponent, LoginComponent],
      imports: [FormsModule, RouterModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        MyRoutesModule],
      providers: [AuthService, StoreService, DbService, {
        provide: Router, useClass: class {
          navigate = jasmine.createSpy('navigate');
        }
      }]
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
