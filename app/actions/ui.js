import { SELECT_CURRENCY } from '../constants';

export function selectCurrency(name){
    return {
        type: SELECT_CURRENCY,
        name
    };
}
