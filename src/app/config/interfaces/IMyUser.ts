import {IDictionary} from '../dictionaris/IDictionary';

export interface IMyUser {
  id: string;
  login: string;
  mail: string;
  password: string;
  status?: string;
  chats?: IDictionary<string>;
  avatar?: string;
  lat?: number;
  lng?: number;
}
