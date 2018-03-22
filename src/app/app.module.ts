import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';


import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ReactiveFormsModule} from '@angular/forms';


import {AuthService} from './services/auth/auth.service';
import {StoreService} from './services/store/store.service';
import {DbService} from './services/db/db.service';

import {AppRouterModule} from './app.router.module';
import {AngularFireStorageModule} from 'angularfire2/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyD1R647Wp9qUwqb8JK_tKSd_KlFPWwpTiA',
  authDomain: 'mychatapp-mf.firebaseapp.com',
  databaseURL: 'https://mychatapp-mf.firebaseio.com',
  projectId: 'mychatapp-mf',
  storageBucket: 'mychatapp-mf.appspot.com',
  messagingSenderId: '357679193170'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    AppRouterModule
  ],
  providers: [AuthService, StoreService, DbService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
