import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AngularFireDatabase} from 'angularfire2/database';
import {LocalStorage} from '../../decorators/local-storage.decorator';
import {IMyUser} from '../../config/interfaces/IMyUser';

@Injectable()
export class StoreService {

  @LocalStorage userInMyApp: IMyUser;
  private myUser = new ReplaySubject<IMyUser>();

  constructor(public  db: AngularFireDatabase) {
  }

  setUser(user: IMyUser): void {
    this.myUser.next({chats: {}, ...user});
    this.userInMyApp = user;
  }

  get user(): Observable<IMyUser> {
    return this.myUser.asObservable();
  }
}
