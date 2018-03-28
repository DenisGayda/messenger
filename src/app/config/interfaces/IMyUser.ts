import {IDictionary} from '../dictionaris/IDictionary';

export interface IMyUser {
  id: string;
  login: string;
  mail: string;
  googleAutentification:boolean;
  password?: string;
  chats?: IDictionary<string>;
}
