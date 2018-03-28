import {Injectable} from '@angular/core';
import {QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ThenableReference} from 'firebase/database';
import {IMessage} from '../../components/chat/config/interfaces/IMessage';
import {IDictionary} from '../../config/dictionaris/IDictionary';

@Injectable()
export class DataBaseServiceMock {

  selectDB<T>(from: string, callback: QueryFn = ref => ref): Observable<T[]> {
    return Observable.of([]);
  }

  updateDB<T>(updates: T): Observable<T> {
    return;
  }

  insertDB<T>(from: string, objToPush: T): ThenableReference {
    return '';
  }

  getNewId(from: string): string {
    return;
  }

  addNewChat(newChat: IDictionary<string>) {
  }

  sendMessage(type: string, text: string, chat: string, user: string) {
  }

  getMessages(chatId: string): Observable<IMessage[]> {
    return;
  }
}
