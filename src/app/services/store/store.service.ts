import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AngularFireDatabase} from 'angularfire2/database';
import {IMyUser} from '../../models/IMyUser';
import {LocalStorage} from '../../decorators/local-storage.decorator';

@Injectable()
export class StoreService {

  @LocalStorage userInMyApp: IMyUser;
  myUser = new ReplaySubject<IMyUser>();

  constructor(public  db: AngularFireDatabase) {}

  setUser(user: IMyUser): void {
    this.myUser.next({chats: {}, ...user});
    this.userInMyApp = user;
  }

  get user(): Observable<IMyUser> {
    return this.myUser.asObservable();
  }
}
