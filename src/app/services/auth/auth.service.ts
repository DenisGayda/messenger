import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {StoreService} from '../store/store.service';
import {DataBaseService} from '../db/dataBase';
import {User} from 'firebase/app';
import {Router} from '@angular/router';
import {IMyUser} from '../../config/interfaces/IMyUser';
import {LocalStorage} from '../../decorators/local-storage.decorator';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Injectable()
export class AuthService implements OnDestroy {
  user: Observable<User>;
  @LocalStorage localLogined: boolean;
  @LocalStorage userInMyApp: IMyUser;

  private onDestroyStream$ = new Subject<void>();

  constructor(private firebaseAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private myDb: DataBaseService,
              private storeService: StoreService,
              private router: Router) {
    this.user = firebaseAuth.authState;
  }


  get logined(): boolean {
    return this.localLogined;
  }
                                         
  signup(email: string, password: string, newLogin: string): void {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
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
          password,
          status: 'online',
          chats: {}
        });
        this.localLogined = true;
        const updates = {};
        updates['/users/' + newPostKey] = postData;
        this.updateStatus('offline');
        this.router.navigateByUrl('/users');
        return this.db.database.ref().update(updates);
      })
      .catch(err => console.error(err));
  }

  login(email: string, password: string): void {
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
                                         
        this.localLogined = true;
        this.updateStatus('online');
        this.router.navigateByUrl('/users');
      })
      .catch(err => console.error(err));
  }

  logout(): void {
    this.localLogined = false;
    this.firebaseAuth
      .auth
      .signOut();
    this.updateStatus('offline');
  }

  updateStatus(newStatus: string): void {
    this.myDb.updateDB(
      this.myDb.generateData<string>(`/users/${this.userInMyApp.id}/status`, newStatus)
    );
  }

  ngOnDestroy(): void {
    this.onDestroyStream$.next();
    this.onDestroyStream$.complete();
  }
}
