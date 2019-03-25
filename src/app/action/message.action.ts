import { Action} from '@ngrx/store';
import { Eval} from '../model/eval';
import {Message} from '../model/message';

export enum MessageActionType {
    ADD_MESSAGE = '[Message] add a message',
    LOAD_MESSAGE = '[Message] load messages',
}


export class AddMessage implements Action {

    readonly type: string = MessageActionType.ADD_MESSAGE;

    constructor(public payload: { message: Message }) {}
}



export type MessageActionUnion =
    | AddMessage
    ;
