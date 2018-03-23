import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import {AngularFireDatabase} from 'angularfire2/database';
import {IMyUser} from '../../models/IMyUser';

@Injectable()
export class StoreService {

  _myUser: ReplaySubject<IMyUser> = new ReplaySubject<IMyUser>();
<<<<<<< HEAD
  
  constructor(public  db: AngularFireDatabase) {   
  }
=======

  constructor(public  db: AngularFireDatabase) {}
>>>>>>> master

  setUser(user: IMyUser): void {
    this._myUser.next({chats: {}, ...user});
    localStorage.setItem('userInMyApp', JSON.stringify(user));
  }

  get user(): Observable<IMyUser> {
    return this._myUser.asObservable();
  }
}
