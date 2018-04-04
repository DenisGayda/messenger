import {EMessageType} from '../enums/EMessageType';

export interface IMessage {
    idMes: string;
    date: number;
    text: string;
    user: string;
    type: EMessageType;
}
