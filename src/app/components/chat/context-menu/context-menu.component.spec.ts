import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ContextMenuComponent} from './context-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {StoreService} from '../../../services/store/store.service';
import {firebaseConfig} from '../../../app.module';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AppRoutingModule} from '../../../routes/app-routing.module';
import {DataBaseService} from '../../../services/db/dataBase.service';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {RouterModule} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {EditingControlService} from '../../../services/control/editing-control.service';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContextMenuComponent],
      imports: [
        MatButtonModule,
        MatListModule,
        CommonModule,
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
        EditingControlService,
        DataBaseService,
        {provide: APP_BASE_HREF, useValue : '/'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
