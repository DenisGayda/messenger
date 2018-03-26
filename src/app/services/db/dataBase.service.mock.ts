import {Injectable} from '@angular/core';
import {QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ThenableReference} from 'firebase/database';
import {IMessage} from '../../models/IMessage';

@Injectable()
export class DataBaseServiceMock {

  selectDB<T>(from: string, callback: QueryFn = ref => ref): Observable<T[]> {
    return Observable.of([]);
  }

  updateDB(updates: Object): Observable<Object> {
    return;
  }

  insertDB(from: string, objToPush: Object): ThenableReference {
    return;
  }

  getNewId(from: string): string {
    return;
  }

  addNewChat(newChat: Object) {}

  sendMessage(type: string, text: string, chat: string, user: string) {}

  getMessages(chatId: string): Observable<IMessage[]> {
    return;
  }
}
