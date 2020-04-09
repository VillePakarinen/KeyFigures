
import { Municipality } from '../model/municipality';

type Action =
    | { type: 'SET_PRIMARY_MUNICIPALITY', payload: Municipality | null }
    | { type: 'SET_SECONDARY_MUNICIPALITY', payload: Municipality | null };

export interface State {
    primaryMuncipality: Municipality | null;
    secondaryMuncipality: Municipality | null;
}

export function keyFigureReducer(state: State, action: Action): State {
    switch (action.type) {
        case ('SET_PRIMARY_MUNICIPALITY'):
            return { ...state, primaryMuncipality: action.payload };
        case ('SET_SECONDARY_MUNICIPALITY'):
            return { ...state, secondaryMuncipality: action.payload };
        default:
            throw new Error("Unknow type in KeyFigureReducer")
    }
}