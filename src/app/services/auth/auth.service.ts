import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';

import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {StoreService} from '../store/store.service';
import {DbService} from '../db/db.service';
import {MyUser} from '../../interfaces/all-interfaces';
import {User} from 'firebase/app';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

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
        console.log('Success!', value);
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

        const updates = {};
        updates['/users/' + newPostKey] = postData;
        this.logined = new BehaviorSubject<boolean>(true);
        this.router.navigateByUrl('/users');
        return this.db.database.ref().update(updates);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.logined = new BehaviorSubject<boolean>(true);
        this.myDb.selectDB('users', ref =>
          ref.orderByChild('mail').equalTo(value.email)).subscribe((users: MyUser[]) => {
          this.storeService.setUser(users[0]);
        });
        this.router.navigateByUrl('/users');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.logined = new BehaviorSubject<boolean>(false);
    this.firebaseAuth
      .auth
      .signOut();
  }


}
