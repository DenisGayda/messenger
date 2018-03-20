import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ThenableReference} from 'firebase/database';

@Injectable()
export class DbServiceMock {

  selectDB<T>(from: string, callback: QueryFn = (ref) => ref): Observable<T[]> {
    return Observable.of([]);
  }

  updateDB(updates: any): Promise<any> {
    return;
  }

  insertDB(from: string, objToPush: any): ThenableReference {
    return;
  }

  getNewId(from: string): string {
    return;
  }

  addNewChat(newChat: any) {
    console.log('Тест добавил чат');
  }
}
