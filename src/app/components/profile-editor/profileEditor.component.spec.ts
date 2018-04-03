import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileEditorComponent} from './profileEditor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataBaseService} from '../../services/db/dataBase.service';
import {StoreService} from '../../services/store/store.service';
import {APP_BASE_HREF} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {RouterModule} from '@angular/router';
import {firebaseConfig} from '../../app.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AppRoutingModule} from '../../routes/app-routing.module';

describe('ProfileEditorComponent', () => {
  let component: ProfileEditorComponent;
  let fixture: ComponentFixture<ProfileEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEditorComponent],
      imports: [FormsModule,
        RouterModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        AppRoutingModule,
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
    fixture = TestBed.createComponent(ProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
