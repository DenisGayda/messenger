import {EMessageType} from '../enums/EMessageType';

export interface IMessage {
  date: number;
  text: string;
  user: string;
  type: EMessageType;
}
