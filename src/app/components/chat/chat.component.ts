import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataBaseService} from '../../services/db/dataBase.service';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../services/store/store.service';
import {Title} from '@angular/platform-browser';
import {IMessage} from './config/interfaces/IMessage';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {EMessageType} from './config/enums/EMessageType';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked{
  messages$: Observable<IMessage[]>;
  newContent = '';
  chatId: string;
  userLogin: string;

  @ViewChild('scrollhere') scroll: ElementRef;

  private onDestroyStream$ = new Subject<void>();

  constructor(private dbService: DataBaseService,
              private storeService: StoreService,
              private route: ActivatedRoute,
              private titleService: Title) {
  }

  ngAfterViewChecked(){
    this.scroll.nativeElement.scrollIntoView();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Чат');
    this.storeService.user
      .takeUntil(this.onDestroyStream$)
      .subscribe(user => this.userLogin = user.login);
    this.route.paramMap
      .takeUntil(this.onDestroyStream$)
      .subscribe(id => {
        this.chatId = id.get('id');
        this.messages$ = this.dbService.getMessages(this.chatId);
      });
  }

  generateDate(mesDate: Date): string {
    return `${new Date(mesDate).getHours()}:${new Date(mesDate).getMinutes()}`;
  }

  addNewContent() {
    if (!this.newContent) {
      return;
    }

    this.dbService.sendMessage(this.chatId, this.generateMessage(EMessageType.TEXT, this.newContent));
    this.newContent = '';
  }

  addFile(target: HTMLInputElement): void {
    const file = target.files.item(0);

    if (file) {
      this.dbService
        .addFile(file)
        .takeUntil(this.onDestroyStream$)
        .subscribe(response => {
          this.dbService.sendMessage(this.chatId, this.generateMessage(EMessageType.IMAGE, response));
        });
    }
  }

  generateMessage(type: EMessageType, text: string): IMessage {
    return {
      type,
      text,
      user: this.userLogin,
      date: Date.now()
    };
  }

  ngOnDestroy(): void {
    this.onDestroyStream$.next();
    this.onDestroyStream$.complete();
  }
}
