import {Component, OnDestroy, OnInit} from '@angular/core';
import {DbService} from '../../services/db/db.service';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../services/store/store.service';
import {Title} from '@angular/platform-browser';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
import {IMessage} from '../../models/IMessage';
import {IMyUser} from '../../models/IMyUser';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages$ = new BehaviorSubject<IMessage[]>([]);
  newContent = '';
  usersInChat: string;
  mi: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  checkUser: Subscription;
  checkMessages: Subscription;
  checkUrlFile: Subscription;
  checkRoute: Subscription;

  constructor(public  db: DbService, private storeService: StoreService, public route: ActivatedRoute,
              private titleService: Title, private firebaseApp: FirebaseApp,
              private afStor: AngularFireStorage) {
  }

  ngOnInit() {
    this.titleService.setTitle('Чат');
    this.checkRoute = this.route.paramMap.subscribe(id => {
      this.usersInChat = id.get('id');
      this.initChat();
    });
  }

  initChat(): void {
    this.checkUser = this.storeService.user.subscribe((user: IMyUser) => {
      this.mi = user.login;
    });
    this.checkMessages = this.db.selectDB<IMessage>(`/chats/${this.usersInChat}/messages/`, ref => {
      return ref.orderByChild('date');
    }).subscribe(this.messages$);
  }

  checkDate(mesDate: Date): string {
    return `${new Date(mesDate).getHours()}:${new Date(mesDate).getMinutes()}`;
  }

  addNewContent(type: string, text: string): void {
    this.db.insertDB(`/chats/${this.usersInChat}/messages/`, {
      text: text ? text : this.newContent,
      date: Date.now(),
      user: this.mi,
      type: type
    });
    this.newContent = '';
  }

  addFile(event: Event): void {
    const file = (<HTMLInputElement>event.target).files.item(0);
    this.ref = this.afStor.ref(file.name);
    this.task = this.ref.put(file);
    this.task.downloadURL().subscribe(response => {
      this.addNewContent('img', response);
    });
  }

  ngOnDestroy(): void {
    this.checkUser.unsubscribe();
    this.checkMessages.unsubscribe();
    this.checkUrlFile.unsubscribe();
    this.checkRoute.unsubscribe();
  }
}
