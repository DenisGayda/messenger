import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {StoreService} from '../store/store.service';
import {DbService} from '../db/db.service';
import {User} from 'firebase/app';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {IMyUser} from '../../models/IMyUser';
import {LocalStorage} from '../../decorators/local-storage.decorator';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService implements OnDestroy {
  user: Observable<User>;
  @LocalStorage localLogined:boolean;
  logined: BehaviorSubject<boolean> = new BehaviorSubject(this.localLogined);
  private onDestroyStream$ = new Subject<void>();
 
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
        this.logined.next(true);
        this.localLogined = true;
        const updates = {};
        updates['/users/' + newPostKey] = postData;
        this.router.navigateByUrl('/users');
        return this.db.database.ref().update(updates);
      })
      .catch(err => {
      });
  }
  
  loginWithGoogle(){
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (success) => {
      this.router.navigateByUrl('/users');
    }).catch(
      (err) => {
      })
  }
  
  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then(value => {
        this.myDb.selectDB('users', ref =>
          ref.orderByChild('mail')
          .equalTo(value.email))
          .takeUntil(this.onDestroyStream$)
          .subscribe((users: IMyUser[]) => {
          this.storeService.setUser(users[0]);
        });
        this.logined.next(true);
        this.localLogined = true;
        this.router.navigateByUrl('/users');
      })
      .catch(err => {
      });
  }

  logout() {
    this.logined.next(false);
    this.localLogined = false;
    this.firebaseAuth
      .auth
      .signOut();
  }

  ngOnDestroy(): void {
    this.onDestroyStream$.next();
    this.onDestroyStream$.complete();
  }

}
