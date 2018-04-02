import {Component, OnInit} from '@angular/core';
import {DataBaseService} from '../../services/db/dataBase.service';
import {LocalStorage} from '../../decorators/local-storage.decorator';
import {IMyUser} from '../../config/interfaces/IMyUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @LocalStorage userInMyApp: IMyUser;

  constructor(private dbService: DataBaseService) {
  }

  ngOnInit(): void {
  }

  chackStatus(newStatus: any) {
    const updates = {};
    updates[`/users/${this.userInMyApp.id}/status`] = newStatus;
    this.dbService.updateDB(updates);
  }
}
