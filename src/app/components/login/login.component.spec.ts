import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {StoreService} from '../../services/store/store.service';
import {UsersComponent} from '../users/users.component';
import {ChatComponent} from '../chat/chat.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {firebaseConfig} from '../../app.module';
import {AuthService} from '../../services/auth/auth.service';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AppRoutingModule} from '../../routes/app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {DataBaseService} from '../../services/db/dataBase.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersComponent,
        ChatComponent,
        LoginComponent
      ],
      imports: [
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        AppRoutingModule
      ],
      providers: [
        AuthService,
        StoreService,
        DataBaseService,
        {provide: APP_BASE_HREF, useValue : '/'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
