import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IMyUser} from '../../interfaces/IMyUser';


@Injectable()
export class StoreServiceMock {

  public setUser(user: IMyUser): void {
    console.log('Test Set User');
  }

  get user(): Observable<IMyUser> {
    return Observable.of({
      id: '0',
      login: 'Test',
      mail: 'test@gmail.com',
      password: 'testtest',
      chats: {},
    });
  }
}
