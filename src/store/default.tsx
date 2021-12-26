import { createStore } from "redux";
import { combineReducers } from 'redux';
import StoreState from "../models/StoreState";
import DefaultState from "../models/DefaultState";
import DefaultActionType from "../models/DefaultActionType";

const tokenReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'PUT':
            return action.payload;
        case 'DELETE':
            return '';
        default:
            if (!state)
                return "init"
            return state;
    }
}

const defaultReducer = (state: any, action: any) => {
    switch (action.type) {
        case DefaultActionType.CLEAR:
            return { data: action.payload, message: "[CLEAR]:   Status has been reset.", status: StoreState.NOTHING } as DefaultState;
        case DefaultActionType.LOADED:
            return { data: action.payload, message: "[LOADED]:  Data has been successfully loaded!", status: StoreState.LOADED_SUCCESSFULLY } as DefaultState;
        case DefaultActionType.LOADING:
            return { data: action.payload, message: "[LOADING]: Loading process started...", status: StoreState.LOADING } as DefaultState;
        case DefaultActionType.ERROR:
            return { data: action.payload, message: "[ERROR]:   Error occured while loading data!", status: StoreState.LOADED_ERROR } as DefaultState;
        default:
            return { data: action.payload, message: "[UNKNOWN]: Unknown parameter got.", status: StoreState.NOTHING } as DefaultState;
    }
}

const rootReducer = combineReducers({
    tokenStore: tokenReducer,
    defaultStore: defaultReducer
});


// const tokenStore = createStore<any, any, any, any>(tokenReducer);
// const defaultStore = createStore<DefaultState, DefaultAction, any, any>(defaultReducer);
const rootStore = createStore(rootReducer)

export default rootStore;
