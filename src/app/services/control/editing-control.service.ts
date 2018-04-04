import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IMessage} from '../../components/chat/config/interfaces/IMessage';

@Injectable()
export class EditingControlService {
  data = new BehaviorSubject<string>('');

  setData(item: string): void {
    this.data.next(item);
  }

  getData(): string {
    return this.data.getValue();
  }
}
