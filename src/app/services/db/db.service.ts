import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ThenableReference} from 'firebase/database';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class DbService {

  constructor(public  db: AngularFireDatabase, private afStor: AngularFireStorage) {
  }

  selectDB<T>(from: string, callback: QueryFn = ref => ref): Observable<T[]> {
    const list: AngularFireList<T> = this.db.list(from, callback);
    return list.valueChanges();
  }

  updateDB(updates: any): Promise<any> {
    return this.db.database.ref().update(updates);
  }

  insertDB(from: string, objToPush: any): ThenableReference {
    return this.db.list(from).push(objToPush);
  }

  getNewId(from: string): string {
    return this.db.database.ref().child(from).push().key;
  }

  addNewChat(newChat: any): void {
    this.db.database.ref().update({...newChat});
  }

  addFile(file: File, chat: string, user: string): void {
    this.afStor.ref(file.name).put(file).downloadURL().subscribe(response => {
      this.sendMessage('img', response, chat, user);
    });
  }

  sendMessage(type: string, text: string, chat: string, user: string): void {
    this.insertDB(`/chats/${chat}/messages/`, {
      text: text,
      date: Date.now(),
      user: user,
      type: type
    });
  }
}
