import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {StoreService} from './services/store/store.service';

const LOGGED = 'logged';
const USER_IN_MY_APP = 'userInMyApp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem(LOGGED))) {
      this.storeService.setUser(JSON.parse(localStorage.getItem(USER_IN_MY_APP)));
    }
  }

}
