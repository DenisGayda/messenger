import {Component, OnInit} from '@angular/core';
import {StoreService} from './services/store/store.service';
import {LocalStorage} from './decorators/local-storage.decorator';
import {IMyUser} from './config/interfaces/IMyUser';
import {DataBaseService} from './services/db/dataBase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  @LocalStorage localLogined: boolean;
  @LocalStorage userInMyApp: IMyUser;

  constructor(private storeService: StoreService,
              private dbService: DataBaseService) {
  }

  ngOnInit(): void {
    if (this.localLogined) {
      this.storeService.setUser(this.userInMyApp);
    }
  }

  windowEvent(status: string): void {
    if (this.localLogined) {
      this.dbService.updateDB(
        this.dbService.generateData(`/users/${this.userInMyApp.id}/status`, status)
      );
    }
  }

}
