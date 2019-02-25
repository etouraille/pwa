import { Injectable } from '@angular/core';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Factor} from '../model/factor';
import { FactorActionUnion, FactorActionType } from '../action/factor.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Eval } from '../model/eval';
import { EvalActionType } from '../action/eval.action';
import { EvalEntity } from '../Entity/eval';

export interface State extends EntityState<Factor> {
    ids: string[],
    entities: { [ id: number ]: Factor }
    selectedFactorId: string | null;
}

export const adapter: EntityAdapter<Factor> = createEntityAdapter<Factor>();

export const initialState: State = adapter.getInitialState({
    selectedFactorId: null,
    ids: [],
    entities: {}
});


export function reducer(state = initialState, action: any ): State  {
    switch(action.type ) {
        case FactorActionType.ADD_FACTORS :
            return adapter.addMany(action.payload.factors, state);
        break;

        case FactorActionType.ADD_FACTOR :
            return adapter.addOne(action.payload.factor, state );
        break;

        case FactorActionType.DELETE_FACTOR :
            return adapter.map((factor) => {
                if( action.payload === factor.id ) {
                    return Object.assign(factor, { display : false });
                } else {
                    return factor ;
                }
             }, state);
        break;

        case FactorActionType.UPSERT_FACTOR :
            return adapter.upsertOne(action.payload.factor, state);
        break;

        default:
            return state;
        break;

    }
}


export interface EvalState extends EntityState<Eval> {
    ids: string[],
    entities: { [ id: number ]: Eval },
    selectedEvalId: string | null;
}

export const evalAdapter: EntityAdapter<Eval> = createEntityAdapter<Eval>();

export const evalInitialState: EvalState = evalAdapter.getInitialState({
    selectedEvalId: null,
    ids: [],
    entities: {}
});

function loadFromFactor( state, action ): EvalState {
    // on vérifie que les eval n'existent pas.
    // si elle n'existent pas on les créés.
    // si elle existent on ne les créés pas.
    const fToAdd = [];
    const evalToAdd = [];
    action.payload.factors.forEach( factor => {
        let exists = false;
        Object.keys( state.entities).map( key => {
            if (state.entities[key].idFactor === factor.id ) {
                exists = true;
            }
       });
       if ( !exists ) {
        fToAdd.push(factor);
       }
    });
    console.log( 'load from factor');
    if( fToAdd.length === 0 ) return state;
    fToAdd.forEach( factor => {
        evalToAdd.push(new EvalEntity(0, factor.id , factor.value ));
    })
    const newIds = [];
    const newEntities = {};

    evalToAdd.forEach(evaluation => {
        newIds.push( evaluation.id);
        newEntities[evaluation.id] = evaluation;
    });
    return  { ...state , ids: Object.assign( state.ids , newIds), entities: Object.assign(state.entities, newEntities ) };
}

function deleteEvalFromFactor( state, action): EvalState {
    console.log( 'DELETE', state, action );
    let idToDelete = null;
    const ids = state.ids;
    const entities = state.entities;
    Object.keys(state.entities).map( key => {
        if (state.entities[key].idFactor === action.payload ) {
            idToDelete = key;
        }
    });
    if ( !idToDelete ) {
        return state;
    }
    console.log('deleted id', idToDelete );
    if (idToDelete) {
        ids.forEach( (id, index) => {
            if( id === idToDelete ) {
                ids.splice(index, 1 );
            }
        });
        delete entities[idToDelete];
    }

    return { ...state, ids: ids, entities : entities };
}

function upsertEvalFromFactor( state, action ): EvalState {
    const entities = state.entities;
    let idToUpdate = null;
    Object.keys(entities).map( key => {
       if( entities[key].idFactor === action.payload.factor.id ) {
            idToUpdate = key;
       }
    });
    if (!idToUpdate) {
        return state;
    } else {
        entities[idToUpdate].factorName = action.payload.factor.value;
        return { ...state, entities: entities };
    }
}

export function evaluationReducer(state = evalInitialState, action: any ): EvalState  {
    switch( action.type ) {
        case EvalActionType.UPSERT_EVAL :
            return evalAdapter.upsertOne(action.payload.evaluation , state);
            break;

        case EvalActionType.LOAD_FROM_FACTORS :

            return loadFromFactor( state, action);
            break;

        case FactorActionType.DELETE_FACTOR :

            return deleteEvalFromFactor( state, action );

        break;

        case FactorActionType.UPSERT_FACTOR :
            return upsertEvalFromFactor( state, action );
        break;

        default:
            return state;
            break;

    }
}

export const selectEvalState = createFeatureSelector<EvalState>('evaluation');

export const selectAllEval = createSelector(
    selectEvalState,
    (e) => {
        console.log( e );
        const ret = [];
        Object.keys(e.entities).map(key=> {
            ret.push(e.entities[key]);
        })
        return ret.sort((a: Eval, b: Eval) =>{
            return a.factorName.localeCompare(b.factorName);
        });
    }
)
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

//export const selectAllFactors = selectAll;

export const selectFactorState = createFeatureSelector<State>('factor');

export const selectAllFactor = createSelector(
    selectFactorState,
    (f, props ) => {
        const ret = [];
        Object.keys(f.entities ).map((key) => {
            //console.log( f.entities[key]);
            if (props && f.entities[key].display) {
                ret.push(f.entities[key]);
            } else if( !props ) {
                ret.push(f.entities[key]);
            }
        })
        return ret.sort((a: Factor, b: Factor ) => {
            return a.value.localeCompare(b.value );
        });
    }
);


@Injectable({providedIn : 'root'})
export class Service {
    getReducers() {
        return { factor : reducer, evaluation: evaluationReducer };
    }
}
