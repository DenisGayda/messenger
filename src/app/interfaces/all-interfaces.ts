export interface MyUser {
  id: string;
  login: string;
  mail: string;
  password: string;
  chats: any;
}

export interface Mes {
  date: number;
  text: string;
  user: string;
  type?: string;
}

export interface Chat {
  idChat: string;
  messages: Mes;
}

export interface Login {
  newLogin?: any;
  email: any;
  password: any;
}

export interface DictionaryInterface<T> {
  [key: string]: T;
}
