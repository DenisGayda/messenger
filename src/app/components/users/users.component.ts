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
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators';
import {combineLatest} from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})

@Injectable()
export class UsersComponent implements OnInit, OnDestroy {

  users$: Observable<IMyUser[]>;
  usersStart$: Observable<IMyUser[]>;
  currentUser$: Observable<IMyUser>;
  find = new FormControl();
  currentUserChat: IMyUser;
  private onDestroy$ = new Subject<void>();

  constructor(public dbService: DbService,
              private storeService: StoreService,
              private router: Router,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Пользователи');
    this.users$ = combineLatest(this.find.valueChanges.pipe(startWith('')), this.dbService.selectDB('users'))
      .map(([searchString, users]: [string, IMyUser[]]) => users.filter(({login}: IMyUser) => login.toLowerCase()
        .includes(searchString.toLowerCase())));
    this.usersStart$ = this.dbService.selectDB<IMyUser>('users');
    this.currentUser$ = this.storeService.user;
  }

  checkChat(user: IMyUser) {
    this.currentUserChat = user;
    this.currentUser$.subscribe(data => {
      data.chats[user.id] !== undefined
        ? this.enterInRealChat(data.chats[user.id])
        : this.createChat(user.id);
    });
  }

  enterInRealChat(check: string) {
    this.dbService.selectDB('chats/' + check, ref => ref)
      .map((items: (string | IDictionary<IMessage>)[]) => items.find(element => typeof element === 'string'))
      .takeUntil(this.onDestroy$)
      .subscribe(id => this.router.navigate(['/users/chat/', id]));
  }

  createChat(chat: string) {
    const newPostKey = this.dbService.getNewId('chats');
    const postData = {
      idChat: newPostKey,
      messages: {}
    };
    this.currentUser$.subscribe(data => {
      this.addChatToClient(chat, data.id, newPostKey);
      this.addChatToClient(data.id, chat, newPostKey);
    });

    const updates = {};
    updates['/chats/' + newPostKey] = postData;
    this.dbService.updateDB(updates)
      .map(() => {
        this.router.navigate(['/users/chat', newPostKey]);
      });
  }

  addChatToClient(id1: string, id2: string, key: string) {
    const updates2 = {};
    updates2[`/users/${id1}/chats/${id2}`] = key;
    this.dbService.addNewChat(updates2);
  }


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
