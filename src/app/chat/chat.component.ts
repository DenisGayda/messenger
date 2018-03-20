import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db/db.service';
import {ActivatedRoute} from '@angular/router';
import {Mes, MyUser} from '../interfaces/all-interfaces';
import {StoreService} from '../services/store/store.service';
import {Title} from '@angular/platform-browser';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Mes[] = [];
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
    this.storeService.user.subscribe((user: MyUser) => {
      this.mi = user.login;
      this.db.selectDB<Mes>('/chats/' + this.usersInChat + '/messages/', ref => {
        return ref.orderByChild('date');
      }).subscribe(messages => this.messages = messages);
      return;
    });

  }

  checkDate(mesDate: any): string {
    return (new Date(mesDate).getHours() + ':' + new Date(mesDate).getMinutes());
  }

  addNewContent(): void {
    this.storeService.user.subscribe((user: MyUser) => {
      this.db.insertDB('/chats/' + this.usersInChat + '/messages/', {
        text: this.newContent,
        date: Date.now(),
        user: user.login,
        type: 'text'
      }).then(() => {
        this.newContent = '';
      }).catch(err => {
        console.log('Something went wrong:', err.message);
      });
    });
  }

  addFile(event) {
    const file = event.target.files.item(0);
    this.ref = this.afStor.ref(file.name);
    this.task = this.ref.put(file);
    this.task.downloadURL().subscribe(response => {

      this.storeService.user.subscribe((user: MyUser) => {
        this.db.insertDB('/chats/' + this.usersInChat + '/messages/', {
          text: response,
          date: Date.now(),
          user: user.login,
          type: 'img'
        });
      });
    });
  }
}
