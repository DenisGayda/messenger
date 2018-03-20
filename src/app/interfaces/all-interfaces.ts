export interface MyUser {
  id: string;
  login: string;
  mail: string;
  password: string;
  chats: {};
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
  newLogin?: string;
  email: string;
  password: string;
}

export interface DictionaryInterface<T> {
  [key: string]: T;
}
