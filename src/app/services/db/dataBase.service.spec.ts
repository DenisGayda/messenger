import {TestBed, inject, async} from '@angular/core/testing';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {Router, RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {StoreService} from '../store/store.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {firebaseConfig} from '../../app.module';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {UsersComponent} from '../../components/users/users.component';
import {ChatComponent} from '../../components/chat/chat.component';
import {LoginComponent} from '../../components/login/login.component';
import {AngularFireStorage, AngularFireStorageModule} from 'angularfire2/storage';
import {AppRoutingModule} from '../../routes/app-routing.module';
import {DataBaseService} from './dataBase';

describe('DataBaseService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersComponent,
        ChatComponent,
        LoginComponent],
      imports: [
        FormsModule,
        RouterModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        ReactiveFormsModule,
        AppRoutingModule],
      providers: [
        AuthService,
        StoreService,
        DataBaseService,
        AngularFireStorage,
        {
          provide: Router, useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }]
    })
      .compileComponents();
  }));

  it('should be created', inject([DataBaseService], (service: DataBaseService) => {
    expect(service).toBeTruthy();
  }));
});
