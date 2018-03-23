import {Component, OnDestroy, OnInit} from '@angular/core';
import {DbService} from '../../services/db/db.service';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../services/store/store.service';
import {Title} from '@angular/platform-browser';
import {IMessage} from '../../models/IMessage';
import {IMyUser} from '../../models/IMyUser';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages$: Observable<IMessage[]>;
  newContent = '';
  chatId: string;
  userLogin: string;

  private onDestroyStream$ = new Subject<boolean>();

  constructor(public dbService: DbService,
              private storeService: StoreService,
              public route: ActivatedRoute,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Чат');
    this.storeService.user.takeUntil(this.onDestroyStream$).subscribe((user: IMyUser) => {
      this.userLogin = user.login;
    });
    this.route.paramMap.takeUntil(this.onDestroyStream$).subscribe(id => {
      this.chatId = id.get('id');
      this.messages$ = this.dbService.getMessages(this.chatId);
    });
  }

  checkDate(mesDate: Date): string {
    return `${new Date(mesDate).getHours()}:${new Date(mesDate).getMinutes()}`;
  }

  addNewContent(): void {
    this.dbService.sendMessage('text', this.newContent, this.chatId, this.userLogin);
    this.newContent = '';
  }

  addFile(target: HTMLInputElement): void {
    const file = target.files.item(0);
    if (file) {
      this.dbService.addFile(file).takeUntil(this.onDestroyStream$).subscribe(response => {
        this.dbService.sendMessage('img', response, this.chatId, this.userLogin);
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroyStream$.next(true);
  }
}
