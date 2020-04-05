
import { Municipality } from '../model/municipalitiesDto';
import { MunicipalityData } from '../model/municipalityData';

type Action =
    | { type: 'SET_MUNICIPALITIES', payload: Municipality[] }
    | { type: 'SET_PRIMARY_MUNICIPALITY_DATA', payload: MunicipalityData | null }
    | { type: 'SET_SECONDARY_MUNICIPALITY_DATA', payload: MunicipalityData | null };

export interface State {
    municipalities: Municipality[];
    primaryMuncipality: MunicipalityData | null;
    secondaryMuncipality: MunicipalityData | null;
}

export function keyFigureReducer(state: State, action: Action): State {
    switch (action.type) {
        case ('SET_PRIMARY_MUNICIPALITY_DATA'):
            return { ...state, primaryMuncipality: action.payload };
        case ('SET_SECONDARY_MUNICIPALITY_DATA'):
            return { ...state, secondaryMuncipality: action.payload };
        case ('SET_MUNICIPALITIES'):
            return { ...state, municipalities: action.payload };
        default:
            throw new Error("Unknow type in KeyFigureReducer")
    }
}