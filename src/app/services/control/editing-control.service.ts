import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class EditingControlService {
  data = new BehaviorSubject('');

  setData(item) {
    this.data.next(item);
  }

  getData() {
    return this.data.getValue();
  }
}
