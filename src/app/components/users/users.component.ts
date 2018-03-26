import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from '../../services/store/store.service';
import {DataBaseService} from '../../services/db/dataBase';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormControl} from '@angular/forms';
import {IMyUser} from '../../models/IMyUser';
import {IDictionary} from '../../models/IDictionary';
import {IMessage} from '../../models/IMessage';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators';
import {combineLatest} from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})

@Injectable()
export class UsersComponent implements OnInit, OnDestroy {

  users: Observable<IMyUser[]>;
  usersStart: Observable<IMyUser[]>;
  currentUser: Observable<IMyUser>;
  find = new FormControl();
  currentUserChat: IMyUser;
  private onDestroyStream$ = new Subject<void>();

  constructor(public dbService: DataBaseService,
              private storeService: StoreService,
              private router: Router,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Пользователи');
    this.users = combineLatest(this.find.valueChanges.pipe(startWith('')), this.dbService.selectDB('users'))
      .map(([searchString, users]: [string, IMyUser[]]) => users.filter(({login}: IMyUser) => login.toLowerCase()
        .includes(searchString.toLowerCase())));
    this.usersStart = this.dbService.selectDB<IMyUser>('users');
    this.currentUser = this.storeService.user;
  }

  checkChat(user: IMyUser): void {
    this.currentUserChat = user;
    this.currentUser.subscribe(data => {
      if (data.chats[user.id] !== undefined) {
        this.enterInRealChat(data.chats[user.id]);
      } else {
        this.createChat(user.id);
      }
    });
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
    this.currentUser.subscribe(data => {
      this.addChatToClient(chat, data.id, newPostKey);
      this.addChatToClient(data.id, chat, newPostKey);
    });

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
