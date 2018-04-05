import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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
