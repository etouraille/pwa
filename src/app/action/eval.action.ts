import { Action} from '@ngrx/store';
import { Eval} from '../model/eval';
import {Factor} from '../model/factor';

export enum EvalActionType {
    UPSERT_EVAL = '[Eval] upsert an eval',
    LOAD_FROM_FACTORS = '[Eval] load from factors',
}


export class UpsertEval implements Action {

    readonly type: string = EvalActionType.UPSERT_EVAL;

    constructor(public payload: { evaluation: Eval }) {}
}

export class LoadEvalsFromFactors implements Action {

    readonly type: string = EvalActionType.LOAD_FROM_FACTORS;

    constructor(public payload: { factors: Factor[] }) {}
}


export type EvalActionUnion =
    | UpsertEval
    | LoadEvalsFromFactors
    ;
