import {Component, OnInit} from '@angular/core';
import {DbService} from '../../services/db/db.service';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../services/store/store.service';
import {Title} from '@angular/platform-browser';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
import {IMessage} from '../../models/IMessage';
import {IMyUser} from '../../models//IMyUser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  messages: IMessage[] = [];
  newContent = '';
  usersInChat: string;

  mi: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(public  db: DbService, private storeService: StoreService, public route: ActivatedRoute,
              private titleService: Title, private firebaseApp: FirebaseApp,
              private afStor: AngularFireStorage) {
  }

  ngOnInit() {
    this.titleService.setTitle('Чат');
    this.route.paramMap.subscribe(id => {
      this.usersInChat = id.get('id');
      this.initChat();
    });
  }

  initChat(): void {
    this.storeService.user.subscribe((user: IMyUser) => {
      this.mi = user.login;
      this.db.selectDB<IMessage>(`/chats/${this.usersInChat}/messages/`, ref => {
        return ref.orderByChild('date');
      }).subscribe(messages => this.messages = messages);
      return;
    });

  }

  checkDate(mesDate: Date): string {
    return `${new Date(mesDate).getHours()}':'${new Date(mesDate).getMinutes()}`;
  }

  addNewContent(type: string, text: string): void {
    this.storeService.user.subscribe((user: IMyUser) => {
      this.db.insertDB(`/chats/${this.usersInChat}/messages/`, {
        text: text ? text : this.newContent,
        date: Date.now(),
        user: user.login,
        type: type
      }).then(() => {
        this.newContent = '';
      }).catch(err => {});
    });
  }

  addFile(event: Event): void {
    const file = (<HTMLInputElement>event.target).files.item(0);
    this.ref = this.afStor.ref(file.name);
    this.task = this.ref.put(file);
    this.task.downloadURL().subscribe(response => {
      this.addNewContent('img', response);
    });
  }
}