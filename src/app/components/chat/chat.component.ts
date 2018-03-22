import {Component, OnDestroy, OnInit} from '@angular/core';
import {DbService} from '../../services/db/db.service';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../services/store/store.service';
import {Title} from '@angular/platform-browser';
import 'firebase/storage';
import {IMessage} from '../../models/IMessage';
import {IMyUser} from '../../models/IMyUser';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages$: Observable<IMessage[]>;
  newContent = '';
  usersInChat: string;
  mi: string;

  checkUser: Subscription;
  checkRoute: Subscription;

  constructor(public  db: DbService,
              private storeService: StoreService,
              public route: ActivatedRoute,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Чат');
    this.checkUser = this.storeService.user.subscribe((user: IMyUser) => {
      this.mi = user.login;
    });
    this.checkRoute = this.route.paramMap.subscribe(id => {
      this.usersInChat = id.get('id');
      this.initChat();
    });
  }

  initChat(): void {
    this.messages$ = this.db.selectDB<IMessage>(`/chats/${this.usersInChat}/messages/`, ref => {
      return ref.orderByChild('date');
    });
  }

  checkDate(mesDate: Date): string {
    return `${new Date(mesDate).getHours()}:${new Date(mesDate).getMinutes()}`;
  }

  addNewContent(): void {
    this.db.sendMessage('text', this.newContent, this.usersInChat, this.mi);
    this.newContent = '';
  }

  addFile(target: HTMLInputElement): void {
    const file = target.files.item(0);
    if (file) {
      this.db.addFile(file, this.usersInChat, this.mi);
    }
  }

  ngOnDestroy(): void {
    this.checkUser.unsubscribe();
    this.checkRoute.unsubscribe();
  }
}
