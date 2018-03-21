import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AngularFireDatabase} from 'angularfire2/database';
import {IMyUser} from '../../models/IMyUser';

@Injectable()
export class StoreService {

  _myUser: ReplaySubject<IMyUser> = new ReplaySubject<IMyUser>();

  constructor(public  db: AngularFireDatabase) {
  }

  setUser(user: IMyUser): void {
    this._myUser.next({chats: {}, ...user});
  }

  get user(): Observable<IMyUser> {
    return this._myUser.asObservable();
  }
}
