import { CREATE_ACCOUNT, UPDATE_ACCOUNT, REMOVE_ACCOUNT } from '../constants';

export function createAccount(fields){
    return function (dispatch, getState) {
        let accounts = getState().accounts;
        let len = accounts.size;
        let key = len ? accounts.last().id + 1 : 1;

        let account = {
            id: key,
            name: fields.name,
            amount: parseFloat(fields.amount),
            currency: fields.currency
        };

        dispatch({
            type: CREATE_ACCOUNT,
            account
        });
    };
}

export function removeAccount(id){
    return {
        type: REMOVE_ACCOUNT,
        id
    };
}

export function updateAccount(id, fields){
    return {
        type: UPDATE_ACCOUNT,
        id,
        fields
    };
}
