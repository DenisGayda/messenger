import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';

import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {StoreService} from '../store/store.service';
import {DbService} from '../db/db.service';
import {User} from 'firebase/app';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {IMyUser} from '../../models/IMyUser';

@Injectable()
export class AuthService {
  user: Observable<User>;
  logined: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('logged')));
 
  constructor(private firebaseAuth: AngularFireAuth,
              public  db: AngularFireDatabase,
              private myDb: DbService,
              private storeService: StoreService,
              private router: Router) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string, newLogin: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        // Get a key for a new Post.
        const newPostKey = this.myDb.getNewId('users');
        const postData = {
          login: newLogin,
          id: newPostKey,
          password: password,
          mail: email
        };
        this.storeService.setUser({
          id: newPostKey,
          login: newLogin,
          mail: email,
          password: password,
          chats: {}
        });
        this.logined = new BehaviorSubject<boolean>(true);
        localStorage.setItem('logged', JSON.stringify(true));
        const updates = {};
        updates['/users/' + newPostKey] = postData;
        this.router.navigateByUrl('/users');
        return this.db.database.ref().update(updates);
      })
      .catch(err => {
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then(value => {
        this.myDb.selectDB('users', ref =>
          ref.orderByChild('mail').equalTo(value.email)).subscribe((users: IMyUser[]) => {
          this.storeService.setUser(users[0]);
        });
        this.logined = new BehaviorSubject<boolean>(true);
        console.log('logined true',this.logined);
        localStorage.setItem('logged', JSON.stringify(true));
        this.router.navigateByUrl('/users');
      })
      .catch(err => {
      });
  }

  logout() {
    this.logined = new BehaviorSubject<boolean>(false);
    console.log('logined false', this.logined);
    localStorage.setItem('logged', JSON.stringify(false));
    this.firebaseAuth
      .auth
      .signOut();
  }


}
