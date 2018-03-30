import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ThenableReference} from 'firebase/database';
import {AngularFireStorage} from 'angularfire2/storage';
import 'rxjs/add/operator/takeUntil';
import {IMessage} from '../../components/chat/config/interfaces/IMessage';
import {IDictionary} from '../../config/dictionaris/IDictionary';

@Injectable()
export class DataBaseService {

  constructor(private  angularDataBase: AngularFireDatabase, private afStor: AngularFireStorage) {
  }

  selectDB<T>(from: string, callback: QueryFn = ref => ref): Observable<T[]> {
    const list: AngularFireList<T> = this.angularDataBase.list(from, callback);
    return list.valueChanges();
  }

  updateDB<T>(updates: T): Observable<T> {
    this.angularDataBase.database.ref().update(updates);
    return new Observable();
  }

  insertDB<T>(from: string, objToPush: T): ThenableReference {
    return this.angularDataBase.list(from).push(objToPush);
  }

  getNewId(from: string): string {
    return this.angularDataBase.database.ref().child(from).push().key;
  }

  addNewChat(newChat: IDictionary<string>): void {
    this.angularDataBase.database.ref().update({...newChat});
  }

  addFile(file: File): Observable<string> {
    return this.afStor
      .ref(file.name)
      .put(file)
      .downloadURL();
  }

  sendMessage(chat: string, newMessage: IMessage): void {
    this.insertDB<IMessage>(`/chats/${chat}/messages/`, newMessage);
  }

  getMessages(chatId: string): Observable<IMessage[]> {
    return this.selectDB<IMessage>(`/chats/${chatId}/messages/`, ref => ref.orderByChild('date'));
  }

}
