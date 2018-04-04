import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DataBaseService} from '../../services/db/dataBase.service';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../services/store/store.service';
import {Title} from '@angular/platform-browser';
import {IMessage} from './config/interfaces/IMessage';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {EMessageType} from './config/enums/EMessageType';
import {EditingControlService} from '../../services/control/editing-control.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages$: Observable<IMessage[]>;
  chatId: string;
  userLogin: string;
  message: IMessage;
  newContent = '';
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  @Input('text') txtForEdit = '';
  @Output() selectMessage = new EventEmitter();
  private onDestroyStream$ = new Subject<void>();

  constructor(private dbService: DataBaseService,
              private storeService: StoreService,
              private route: ActivatedRoute,
              private titleService: Title,
              private control: EditingControlService) {
  }

  onrightClick(event, mes: IMessage) {
    if (event.target.className === 'user-mi' || event.target.className === 'date-span') {
      this.contextmenuX = event.clientX;
      this.contextmenuY = event.clientY;
      this.contextmenu = true;
      this.message = mes;
      this.selectMessage.emit(mes);
      this.control.data
        .takeUntil(this.onDestroyStream$)
        .subscribe(data => this.newContent = data);
    }
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
    if (this.control.getData()) {
      const updates = {};
      updates[`/chats/${this.chatId}/messages/${this.message.idMes}`] = this.generateMessage(EMessageType.TEXT, this.newContent);
      this.dbService.updateDB(updates)
      this.newContent = '';
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

  generateMessage(type: EMessageType, text: string) {
    let newPostKey;
    if (this.control.getData()) {
      newPostKey = this.message.idMes;
    } else {
      newPostKey = this.dbService.getNewId('messages');
    }

    return {
      idMes: newPostKey,
      type,
      text,
      user: this.userLogin,
      date: this.message.date || Date.now()
    };
  }

  disableContextMenu(event) {
    if (event.target.localName !== 'input') {
      this.contextmenu = false;
      this.newContent = '';
    }
    return;
  }

  ngOnDestroy(): void {
    this.onDestroyStream$.next();
    this.onDestroyStream$.complete();
  }
}
