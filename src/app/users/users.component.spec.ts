import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {StoreService} from '../services/store/store.service';
import {DbService} from '../services/db/db.service';
import {firebaseConfig} from '../app.module';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {MyRoutesModule} from '../routes/my-routes.module';
import {ChatComponent} from '../chat/chat.component';
import {LoginComponent} from '../login/login.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Method "start" test', () => {
    expect(component.start({target: {value: ''}}));
  });

  it('Method "checkChat" test', () => {
    component.currentUser = {
      id: '',
      login: '',
      mail: '',
      password: '',
      chats: { '0' : undefined}
    };
    expect(component.checkChat('0'));
  });

  it('Method "enterInRealChat" test', () => {
    expect(component.enterInRealChat('some'));
  });

  it('Method "createChat" test', () => {
    component.currentUser = {
      id: '',
      login: '',
      mail: '',
      password: '',
      chats: { '0' : undefined}
    };
    expect(component.createChat('0'));
  });

  it('Method "addChatToClient" test', () => {
    component.currentUser = {
      id: '',
      login: '',
      mail: '',
      password: '',
      chats: ''
    };
    expect(component.addChatToClient('someId1', 'someId2', 'someKey'));
  });

  /*it('Проверка подключения к чату', () => {
    expect(component.enterInRealChat('some text')).toBe(true);
  });*/

});
