import {Component, Injectable, OnInit} from '@angular/core';
import {StoreService} from '../services/store/store.service';
import {DbService} from '../services/db/db.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormControl} from '@angular/forms';
import {IMyUser} from '../interfaces/IMyUser';
import {IDictionary} from '../interfaces/IDictionary';
import {IMessage} from '../interfaces/IMessage';
import {Observable} from 'rxjs/Observable';
import { startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})

@Injectable()
export class UsersComponent implements OnInit {

  users: Observable<any>;
  usersStart: Observable<IMyUser[]>;
  currentUser: Observable<IMyUser>;
  find = new FormControl();

  constructor(public db: DbService, private storeService: StoreService, private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Пользователи');
    this.users = combineLatest(this.find.valueChanges.pipe(startWith('')), this.db.selectDB('users'))
      .map(res => {
        if (res[0] === '') {
          return res[1];
        } else {
          const txt = res[0];
          const users = res[1];
          const trueUsers = [];
          users.forEach((user: IMyUser) => {
            if (user.login.toLowerCase().indexOf(txt) !== -1) {
              trueUsers.push(user);
            }
          });
          return trueUsers;
        }
      })
      .map(data => data)
    this.usersStart = this.db.selectDB<IMyUser>('uersers')
    this.currentUser = this.storeService.user;
  }

  checkChat(chat: string, btn): void {
    this.activeBtn(btn);
    this.currentUser.subscribe(data => {
      if (data.chats[chat] !== undefined) {
        this.enterInRealChat(data.chats[chat]);
      } else {
        this.createChat(chat);
      }
    });
  }

  enterInRealChat(check: string): void {
    this.db.selectDB('chats/' + check, ref => ref)
      .map((items: (string | IDictionary<IMessage>)[]) => items.find(element => typeof element === 'string'))
      .subscribe(id => this.router.navigate(['/users/chat/', id]));
  }

  createChat(chat: string): void {
    const newPostKey = this.db.getNewId('chats');
    const postData = {
      idChat: newPostKey,
      messages: {}
    };
    this.currentUser.subscribe(data => {
      this.addChatToClient(chat, data.id, newPostKey);
      this.addChatToClient(data.id, chat, newPostKey);
    });


    const updates = {};
    updates['/chats/' + newPostKey] = postData;
    this.db.updateDB(updates).then(() => {
      this.router.navigate(['/users/chat', newPostKey]);
    });
  }

  addChatToClient(id1: string, id2: string, key: string): void {
    const updates2 = {};
    updates2[`/users/${id1}/chats/${id2}`] = key;
    this.db.addNewChat(updates2);
  }

  activeBtn(btn) {
    this.users.subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].login.toLowerCase() === btn.innerText.toLowerCase()) {
          [data[0], data[i]] = [Object.assign({}, data[i]), Object.assign({}, data[0])] ;
          break;
        }
      }
      return data;
    });
  }
}
