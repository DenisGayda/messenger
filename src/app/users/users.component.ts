import {Component, Injectable, OnInit} from '@angular/core';
import {StoreService} from '../services/store/store.service';
import {DbService} from '../services/db/db.service';
import {Router} from '@angular/router';
import {DictionaryInterface, Mes, MyUser} from '../interfaces/all-interfaces';
import {Title} from '@angular/platform-browser';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
@Injectable()
export class UsersComponent implements OnInit {

  users: MyUser[] = [];
  usersStart: MyUser[] = [];
  currentUser: MyUser;
  find = new FormControl();

  constructor(public db: DbService, private storeService: StoreService, private router: Router, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Пользователи');
    this.db.selectDB<MyUser>('users').subscribe(users => {
        this.usersStart = users;
        this.users = users;
      }
    );
    this.storeService.user.subscribe((user: MyUser) => {
      this.currentUser = user;
    });

    this.find.valueChanges.subscribe(find => {
      this.users = this.usersStart.filter(({login}: MyUser) => login.toUpperCase().includes(find.toUpperCase()));
    });
  }

  checkChat(chat: string): void {
    if (this.currentUser.chats[chat] !== undefined) {
      this.enterInRealChat(this.currentUser.chats[chat]);
    } else {
      this.createChat(chat);
    }
  }

  enterInRealChat(check: string): void {
    this.db.selectDB('chats/' + check, ref => ref)
      .map((items: (string | DictionaryInterface<Mes>)[]) => items.find(el => typeof el === 'string'))
      .subscribe(id => this.router.navigate(['/users/chat/', id]));
  }

  createChat(chat: string): void {
    const newPostKey = this.db.getNewId('chats');
    const postData = {
      idChat: newPostKey,
      messages: {}
    };
    this.addChatToClient(chat, this.currentUser.id, newPostKey);
    this.addChatToClient(this.currentUser.id, chat, newPostKey);

    const updates = {};
    updates['/chats/' + newPostKey] = postData;
    this.db.updateDB(updates).then(() => {
      this.router.navigate(['/users/chat', newPostKey]);
    });
  }

  addChatToClient(id1: string, id2: string, key: string): void {
    const updates2 = {};
    updates2['/users/' + id1 + '/chats/' + id2] = key;
    this.db.addNewChat(updates2);
  }

}
