import {IDictionary} from './IDictionary';

export interface IMyUser {
  id: string;
  login: string;
  mail: string;
  password: string;
  chats?: IDictionary<string>;
}
