import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MyUser} from '../../interfaces/all-interfaces';


@Injectable()
export class StoreServiceMock {

  setUser(user: MyUser): void {
    console.log('Test Set User');
  }

  get user(): Observable<MyUser> {
    return Observable.of({
      id: '0',
      login: 'Test',
      mail: 'test@gmail.com',
      password: 'testtest',
      chats: '',
    });
  }
}
