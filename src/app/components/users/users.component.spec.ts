import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {ChatComponent} from '../chat/chat.component';
import {LoginComponent} from '../login/login.component';
import {firebaseConfig} from '../../app.module';
import {AuthService} from '../../services/auth/auth.service';
import {StoreService} from '../../services/store/store.service';
import {DataBaseService} from '../../services/db/dataBase.service';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AppRoutingModule} from '../../routes/app-routing.module';
import {APP_BASE_HREF} from '@angular/common';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

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
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        AppRoutingModule
      ],
      providers: [
        AuthService,
        StoreService,
        DataBaseService,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Method "checkChat" test', () => {
    expect(component.checkChat({
      id: 'some',
      login: '',
      status: 'online',
      mail: '',
      googleAutentification:false,
      password: '',
      chats: {}
    }));
  });

  it('Method "enterInRealChat" test', () => {
    expect(component.enterInRealChat('some'));
  });

  it('Method "createChat" test', () => {
    expect(component.createChat('0'));
  });

  /*
  it('Method "addChatToClient" test', () => {
    expect(component.addChatToClient('someId1', 'someId2', 'someKey'));
  });
  */

});
