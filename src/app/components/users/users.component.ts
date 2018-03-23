import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from '../../services/store/store.service';
import {DbService} from '../../services/db/db.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormControl} from '@angular/forms';
import {IMyUser} from '../../models/IMyUser';
import {IDictionary} from '../../models/IDictionary';
import {IMessage} from '../../models/IMessage';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
@Injectable()
export class UsersComponent implements OnInit, OnDestroy {

  users: IMyUser[];
  usersStart: IMyUser[];
  currentUser: IMyUser;
  find = new FormControl();
  private onDestroyStream$ = new Subject<void>();
  constructor(public dbService: DbService,
              private storeService: StoreService,
              private router: Router,
              private titleService: Title) {

  }

  ngOnInit() {
    this.titleService.setTitle('Пользователи');
    this.dbService.selectDB<IMyUser>('users').subscribe(users => {
        this.usersStart = users;
        this.users = users;
      }
    );
    this.storeService.user
      .takeUntil(this.onDestroyStream$)
      .subscribe((user: IMyUser) => {
        this.currentUser = user;
      });

    this.find.valueChanges
      .takeUntil(this.onDestroyStream$)
      .subscribe(find => {
      this.users = this.usersStart.filter(({login}: IMyUser) => login.toUpperCase().includes(find.toUpperCase()));
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
    this.dbService.selectDB('chats/' + check, ref => ref)
      .map((items: (string | IDictionary<IMessage>)[]) => items.find(element => typeof element === 'string'))
      .takeUntil(this.onDestroyStream$)
      .subscribe(id => this.router.navigate(['/users/chat/', id]));
  }

  createChat(chat: string): void {
    const newPostKey = this.dbService.getNewId('chats');
    const postData = {
      idChat: newPostKey,
      messages: {}
    };
    this.addChatToClient(chat, this.currentUser.id, newPostKey);
    this.addChatToClient(this.currentUser.id, chat, newPostKey);
    const updates = {};
    updates['/chats/' + newPostKey] = postData;
    this.dbService.updateDB(updates).map(() => {
      this.router.navigate(['/users/chat', newPostKey]);
    });
  }

  addChatToClient(id1: string, id2: string, key: string): void {
    const updates2 = {};
    updates2[`/users/${id1}/chats/${id2}`] = key;
    this.dbService.addNewChat(updates2);
  }


  ngOnDestroy(): void {
    this.onDestroyStream$.next();
    this.onDestroyStream$.complete();
  }
}
