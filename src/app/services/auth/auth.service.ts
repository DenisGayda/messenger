import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {StoreService} from '../store/store.service';
import {DataBaseService} from '../db/dataBase.service';
import {User} from 'firebase/app';
import {Router} from '@angular/router';
import {IMyUser} from '../../config/interfaces/IMyUser';
import {IPostData} from '../../config/interfaces/IPostData';
import {LocalStorage} from '../../decorators/local-storage.decorator';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeUntil';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService implements OnDestroy {
  user: Observable<User>;
  @LocalStorage localLogined: boolean;
  logined = new BehaviorSubject(this.localLogined);

  private onDestroyStream$ = new Subject<void>();

  constructor(private firebaseAuth: AngularFireAuth,
              public  db: AngularFireDatabase,
              private myDb: DataBaseService,
              private storeService: StoreService,
              private router: Router) {
    this.user = firebaseAuth.authState;
  }

  loginToSystem():void{
    this.logined.next(true);
    this.localLogined = true;
    this.router.navigateByUrl('/users');
  }


  signup( email:string, login:string, google:boolean, password?:string):void{
       // Get a key for a new Post.
       const newPostKey = this.myDb.getNewId('users');
       const postData:IPostData = {
        login:login,
        id: newPostKey,
        mail: email,
        googleAutentification:google
      };

       if(password){
        postData.password = password;
       }
       
       this.storeService.setUser({
         googleAutentification:google,
         chats: {}, 
         ...postData
       });

       const updates = {};

       updates['/users/' + newPostKey] = postData;
       this.loginToSystem()
       this.db.database.ref().update(updates);
  }

  signupWithEmail(email: string, password: string, newLogin: string):void {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.signup(email, newLogin, false, password);
      })
      .catch(err => console.error(err));
  }

  login(email:string, name?:string):void {
    this.myDb.selectDB('users', ref =>
        ref.orderByChild('mail')
      .equalTo(email))
      .takeUntil(this.onDestroyStream$)
      .subscribe((users: IMyUser[]) => {
        if(users.length>0){
          this.storeService.setUser(users[0]);
          this.loginToSystem();
          return;
        }
        if(name){
          this.signup(email, name, true);
        } 
      });
  }

  loginWithEmail(email: string, password: string):void {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then(value => {
        this.login(value.email);
      })
      .catch(err => console.error(err));
  }
  
  loginWithGoogle():void{
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
  }

  changePassword(newPassword: string): void {
    this.firebaseAuth.auth.currentUser.updatePassword(newPassword);
  }

  ngOnDestroy(): void {
    this.onDestroyStream$.next();
    this.onDestroyStream$.complete();
  }
}