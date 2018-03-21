import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {StoreService} from './services/store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('logged'))) {
      this.storeService.setUser(JSON.parse(localStorage.getItem('userInMyApp')));
    }
  }

}
