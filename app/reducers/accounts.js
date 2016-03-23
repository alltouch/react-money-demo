import Immutable from 'immutable';
import { CREATE_ACCOUNT, UPDATE_ACCOUNT, REMOVE_ACCOUNT } from '../constants';
import AccountModel from '../models/account';

const initialState = Immutable.List();

export default function (state = initialState, action){
    if(action.type === CREATE_ACCOUNT){
        return state.push(new AccountModel(action.account));
    } else if(action.type === REMOVE_ACCOUNT){
        let index = state.findIndex(account => account.id === action.id);

        return state.remove(index);
    } else if(action.type === UPDATE_ACCOUNT){
        let index = state.findIndex(account => account.id === action.id);

        return state.update(index, (account) => account.merge(action.fields));
    }

    return state;
}
