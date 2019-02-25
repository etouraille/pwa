import { Action} from '@ngrx/store';
import { Factor} from '../model/factor';

export enum FactorActionType {
    ADD_FACTOR = '[Factor] add a new factor',
    UPSERT_FACTOR = '[Factor] upsert a factor',
    LOAD_FACTOR = '[Factor], load all factors',
    DELETE_FACTOR = '[Factor], delte factor',
    ADD_FACTORS = '[Factors], add factors',
}

export class AddFactor implements Action {

    readonly type: string = FactorActionType.ADD_FACTOR;

    constructor(public payload: { factor: Factor }) {}
}

export class UpsertFactor implements Action {

    readonly type: string = FactorActionType.UPSERT_FACTOR;

    constructor(public payload: { factor: Factor}) {}
}

export class LoadFactor implements Action {

    readonly type: string = FactorActionType.LOAD_FACTOR;
}

export class DeleteFactor implements Action {

    readonly type: string = FactorActionType.DELETE_FACTOR;

    constructor(public payload : string ) {}
}

export class AddFactors implements Action {

    readonly type: string = FactorActionType.ADD_FACTORS;

    constructor(public payload: { factors: Factor[]}) {}
}

export type FactorActionUnion =
    | AddFactor
    | UpsertFactor
    | LoadFactor
    | DeleteFactor
    | AddFactors;
