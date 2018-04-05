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

  @LocalStorage localLogined: boolean;
  @LocalStorage userInMyApp: IMyUser;
  @LocalStorage newLogin: boolean;

  constructor(private dbService: DataBaseService) {
  }

  ngOnInit(): void {
  }

  setNewLogin(){
     this.newLogin = false;
  }

  checkStatus(newStatus: string) {
    this.dbService.updateDB(
      this.dbService.generateData<string>(`/users/${this.userInMyApp.id}/status`, newStatus)
    );
  }
}
