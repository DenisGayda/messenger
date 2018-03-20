import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ThenableReference} from 'firebase/database';

@Injectable()
export class DbService {

  constructor(public  db: AngularFireDatabase) {
  }

  selectDB<T>(from: string, callback: QueryFn = (ref) => ref): Observable<T[]> {
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
}
