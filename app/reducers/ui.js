import Immutable from 'immutable';
import { ALL_CURRENCY } from '../config';
import { SELECT_CURRENCY } from '../constants';

const initialState = Immutable.Map({
    currency: ALL_CURRENCY,
    course: 1.1
});

export default function (state = initialState, action){
    if(action.type === SELECT_CURRENCY){
        return state.set('currency', action.name);
    }

    return state;
}
