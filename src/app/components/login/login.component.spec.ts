import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
<<<<<<< HEAD
import {StoreService} from '../services/store/store.service';
import {DbService} from '../services/db/db.service';
import {AppRouterModule} from '../routes/app.router.module';
=======
>>>>>>> master
import {UsersComponent} from '../users/users.component';
import {ChatComponent} from '../chat/chat.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {firebaseConfig} from '../../app.module';
import {MyRoutesModule} from '../../routes/my-routes.module';
import {AuthService} from '../../services/auth/auth.service';
import {StoreService} from '../../services/store/store.service';
import {DbService} from '../../services/db/db.service';
import {AngularFireStorageModule} from 'angularfire2/storage';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, ChatComponent, LoginComponent],
      imports: [FormsModule, RouterModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        AppRouterModule],
      providers: [AuthService, StoreService, DbService, {
        provide: Router, useClass: class {
          navigate = jasmine.createSpy('navigate');
        }
      }]
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
