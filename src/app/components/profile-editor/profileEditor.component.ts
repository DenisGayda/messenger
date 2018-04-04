import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {IMyUser} from '../../config/interfaces/IMyUser';
import {DataBaseService} from '../../services/db/dataBase.service';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../../services/auth/auth.service';
import {StoreService} from '../../services/store/store.service';
import {LocalStorage} from '../../decorators/local-storage.decorator';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profileEditor.component.html',
  styleUrls: ['./profileEditor.component.less']
})
export class ProfileEditorComponent implements OnInit, OnDestroy {
  userProfile: FormGroup;
  @LocalStorage userInMyApp: IMyUser;
  currentUser = this.userInMyApp;
  currentPhoto: File;

  private onDestroyStream$ = new Subject<void>();

  constructor(private titleService: Title,
              private dbService: DataBaseService,
              private authService: AuthService,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Профиль');

    this.userProfile = new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
      passwordSecond: new FormControl()
    });
  }

  onSubmit(formValue: any): void {
    console.log(formValue);
    if (this.currentPhoto) {
      this.dbService
        .addFile(this.currentPhoto)
        .takeUntil(this.onDestroyStream$)
        .subscribe(response => {
          this.currentUser.avatar = response;
          this.sendData('avatar', response);
          this.storeService.setUser(this.currentUser);
        });
    }

    if (formValue.password) {
      this.sendData('password', formValue.password);
      this.authService.changePassword(formValue.password);
    }

    if (formValue.login) {
      this.sendData('login', formValue.login);
    }
  }

  sendData(dataName: string, data: string): void {
    const newData = {};
    newData[`/users/${this.currentUser.id}/${dataName}`] = data;
    this.dbService.updateDB(newData);

    this.currentUser[dataName] = data;
    this.storeService.setUser(this.currentUser);
  }

  changePhoto(target: HTMLInputElement): void {
    this.currentPhoto = target.files.item(0);
  }

  ngOnDestroy(): void {
    this.onDestroyStream$.next();
    this.onDestroyStream$.complete();
  }

}
