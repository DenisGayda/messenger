import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {MyUser} from '../../interfaces/all-interfaces';
import {AngularFireDatabase} from 'angularfire2/database';


@Injectable()
export class StoreService {

  constructor(public  db: AngularFireDatabase) {
  }

  _myUser: ReplaySubject<MyUser> = new ReplaySubject<MyUser>();

  setUser(user: MyUser): void {
    this._myUser.next({chats: {}, ...user});
  }

  get user(): Observable<MyUser> {
    return this._myUser.asObservable();
  }
}
