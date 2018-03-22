import {TestBed, inject, async} from '@angular/core/testing';

import { StoreService } from './store.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {Router, RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {DbService} from '../db/db.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyRoutesModule} from '../../routes/my-routes.module';
import {AuthService} from '../auth/auth.service';
import {firebaseConfig} from '../../app.module';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {UsersComponent} from '../../components/users/users.component';
import {ChatComponent} from '../../components/chat/chat.component';
import {LoginComponent} from '../../components/login/login.component';
import {AngularFireStorageModule} from 'angularfire2/storage';

describe('StoreService', () => {
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

  it('should be created', inject([StoreService], (service: StoreService) => {
    expect(service).toBeTruthy();
  }));
});
