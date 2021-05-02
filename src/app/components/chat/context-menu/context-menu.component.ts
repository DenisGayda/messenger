import {Component, Input} from '@angular/core';
import {DataBaseService} from '../../../services/db/dataBase.service';
import {EditingControlService} from '../../../services/control/editing-control.service';
import {EMessageType} from '../config/enums/EMessageType';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.less']
})
export class ContextMenuComponent {
  @Input() x = 0;
  @Input() y = 0;
  @Input() id = 0;
  @Input('mes') message = {
    idMes: '',
    date: 0,
    text: '',
    user: '',
    type: EMessageType
  };

  constructor(private dbServise: DataBaseService, private control: EditingControlService) {}

  editMessage() {
    this.control.setData(this.message.text);
  }

  deleteMessage() {
    return this.dbServise.deleteData(`/chats/${this.id}/messages/${this.message.idMes}`);
  }
}
