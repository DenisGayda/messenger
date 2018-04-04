import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ThenableReference} from 'firebase/database';
import {AngularFireStorage} from 'angularfire2/storage';
import {IMessage} from '../../components/chat/config/interfaces/IMessage';
import {IDictionary} from '../../config/dictionaris/IDictionary';

@Injectable()
export class DataBaseService {

  constructor(private angularDataBase: AngularFireDatabase, private afStor: AngularFireStorage) {
  }

  selectDB<T>(from: string, callback: QueryFn = ref => ref): Observable<T[]> {
    const list: AngularFireList<T> = this.angularDataBase.list(from, callback);

    return list.valueChanges();
  }

  updateDB<T>(updates: T): Promise<Observable<{}>> {
    return this.angularDataBase.database.ref().update(updates).then(() => new Observable());
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

  sendMessage(chat: string, newMessage: IMessage, id: string): void {
    this.updateDB(this.generateData<IMessage>(`/chats/${chat}/messages/${id}/`, newMessage));
  }

  getMessages(chatId: string): Observable<IMessage[]> {
    return this.selectDB(`/chats/${chatId}/messages/`, ref => ref.orderByChild('date'));
  }

  generateData<T>(where: string, newData: T): IDictionary<T> {
    const updates = {};
    updates[where] = newData;
    return updates;
  }

}
