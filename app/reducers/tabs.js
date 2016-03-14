import Immutable from 'immutable';
import TabModel from '../models/tab';
import { CREATE_TAB, REMOVE_TAB, RENAME_TAB } from '../constants';

const totalTab = new TabModel({
    id: 0,
    name: 'Total'
});

const initialState = Immutable.List([totalTab]);

export default function (state = initialState, action){
    if(action.type === CREATE_TAB){
        let tab = new TabModel({
            id: action.id,
            name: action.name
        });
        return state.push(tab);
    } else if(action.type === REMOVE_TAB){
        let index = state.findIndex(tab => tab.id === action.id);

        return state.remove(index);
    } else if(action.type === RENAME_TAB){
        let index = state.findIndex(tab => tab.id === action.id);

        return state.update(index, tab => tab.set('name', action.name));
    }

    return state;
}
