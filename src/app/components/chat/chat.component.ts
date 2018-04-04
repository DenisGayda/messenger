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
  newContent: string;
  contextMenu = false;
  contextMenuX: number;
  contextMenuY: number;

  @Input('text') txtForEdit = '';
  @Output() selectMessage = new EventEmitter();
  private onDestroyStream$ = new Subject<void>();

  constructor(private dbService: DataBaseService,
              private storeService: StoreService,
              private route: ActivatedRoute,
              private titleService: Title,
              private control: EditingControlService) {
  }

  onRightClick(event: MouseEvent, mes: IMessage): void {
    if (event.target['className'] === 'user-mi' || event.target['className'] === 'date-span') {
      this.contextMenuX = event.clientX;
      this.contextMenuY = event.clientY;
      this.contextMenu = true;
      this.message = mes;
      console.log(this.message);
      console.log(event);
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

  addNewContent(): void {
    if (!this.newContent) {
      return;
    }
    if (this.control.getData()) {
      const updates = {};
      updates[`/chats/${this.chatId}/messages/${this.message.idMes}`]
        = this.generateMessage(EMessageType.TEXT, this.newContent);
      this.dbService.updateDB(updates);
      this.newContent = '';
      this.control.setData('');
      return;
    }
    const id = this.dbService.getNewId('messages');

    this.dbService.sendMessage(this.chatId,
      this.generateMessage(EMessageType.TEXT, this.newContent, id), id);
    this.newContent = '';
  }

  addFile(target: HTMLInputElement): void {
    const file = target.files.item(0);

    if (file) {
      this.dbService
        .addFile(file)
        .takeUntil(this.onDestroyStream$)
        .subscribe(response => {
          const id = this.dbService.getNewId('messages');

          this.dbService.sendMessage(this.chatId, this.generateMessage(EMessageType.IMAGE, response), id);
        });
    }
  }

  generateMessage(type: EMessageType, text: string, id?: string): IMessage {
    return {
      idMes: id ? id : this.message.idMes,
      type,
      text,
      user: this.userLogin,
      date: id ? Date.now() : this.message.date
    };
  }

  disableContextMenu(event: HTMLElement): void {
    if (event.localName !== 'input') {
      this.contextMenu = false;
      this.newContent = '';
    }
  }

  ngOnDestroy(): void {
    this.onDestroyStream$.next();
    this.onDestroyStream$.complete();
  }
}
