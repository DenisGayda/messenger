import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {StoreService} from '../store/store.service';
import {DataBaseService} from '../db/dataBase.service';
import {User} from 'firebase/app';
import {Router} from '@angular/router';
import {IMyUser} from '../../config/interfaces/IMyUser';
import {LocalStorage} from '../../decorators/local-storage.decorator';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeUntil';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService implements OnDestroy {
  user: Observable<User>;
  @LocalStorage localLogined: boolean;
  @LocalStorage userInMyApp: IMyUser;
  logined = new BehaviorSubject(this.localLogined);

  private onDestroyStream$ = new Subject<void>();

  constructor(private firebaseAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private myDb: DataBaseService,
              private storeService: StoreService,
              private router: Router) {
    this.user = firebaseAuth.authState;
  }

  loginToSystem(): void {
    this.logined.next(true);
    this.localLogined = true;
    this.router.navigateByUrl('/users');
  }


  signup( {mail, login, googleAutentification, password}: IMyUser): void {
    // Get a key for a new Post.
    const newPostKey = this.myDb.getNewId('users');
    const postData: IMyUser = {
      avatar: 'https://pp.userapi.com/c617331/v617331712/1a76e/kr3Gj23sWNg.jpg',
      login: login,
      id: newPostKey,
      mail: mail,
      googleAutentification: googleAutentification,
      chats: {},
    };

    if (password) {
      postData.password = password;
    }

    this.storeService.setUser(postData);
    this.loginToSystem();
    this.db.database.ref().update(
      this.myDb.generateData(`/users/${newPostKey}/`, postData)
    );
  }

  signupWithEmail(email: string, password: string, newLogin: string): void {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.signup({mail: email, login: newLogin, googleAutentification: false, password});
      })
      .catch(err => console.error(err));
  }

  login(email: string, name?: string): void {
    this.myDb.selectDB('users', ref =>
      ref.orderByChild('mail')
        .equalTo(email))
      .takeUntil(this.onDestroyStream$)
      .subscribe((users: IMyUser[]) => {
        if (users.length > 0) {
          this.storeService.setUser(users[0]);
          this.loginToSystem();
          return;
        }
        if (name) {
          this.signup({mail: email, login: name, googleAutentification: true});
        }
      });
  }

  loginWithEmail(email: string, password: string): void {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then(value => {
        this.login(value.email);
      })
      .catch(err => console.error(err));
  }

  loginWithGoogle(): void {
    this.firebaseAuth
      .auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(value => {
        this.login(value.user.email, value.user.displayName);
      })
      .catch(err => console.error(err));
  }

  logout(): void {
    this.logined.next(false);
    this.localLogined = false;
    this.firebaseAuth
      .auth
      .signOut();
    this.updateStatus('offline');
    this.userInMyApp = null;
  }

  updateStatus(newStatus: string): void {
    this.myDb.updateDB(
      this.myDb.generateData<string>(`/users/${this.userInMyApp.id}/status`, newStatus)
    );
  }

  changePassword(newPassword: string): void {
    this.firebaseAuth.auth.currentUser.updatePassword(newPassword);
  }

  ngOnDestroy(): void {
    this.onDestroyStream$.next();
    this.onDestroyStream$.complete();
  }
}
