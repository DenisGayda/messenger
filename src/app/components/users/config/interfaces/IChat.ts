import {IMessage} from '../../../chat/config/interfaces/IMessage';
import {IDictionary} from '../../../../config/dictionaris/IDictionary';

export interface IChat {
  idChat: string;
  messages: IDictionary<IMessage>;
}
