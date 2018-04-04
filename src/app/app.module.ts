import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ReactiveFormsModule} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {AuthService} from './services/auth/auth.service';
import {StoreService} from './services/store/store.service';
import {AppRoutingModule} from './routes/app-routing.module';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {CanActivateViaAuthGuard} from './services/guards/CanActivateViaAuthGuard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from './components/header/header.module';
import {DataBaseService} from './services/db/dataBase.service';
import {ProfileEditorModule} from './components/profile-editor/profile-editor.module';
import {EditingControlService} from './services/control/editing-control.service';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    ProfileEditorModule
  ],
  providers: [
    AuthService,
    StoreService,
    DataBaseService,
    Title,
    CanActivateViaAuthGuard,
    EditingControlService
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}
