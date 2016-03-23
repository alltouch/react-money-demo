import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';
import Immutable from 'immutable';
import TabModel from './models/tab'
import AccountModel from './models/account'

export function configureStore(history) {

    const reducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    return createStore(
        reducer,
        getInitialState(),
        compose(
            applyMiddleware(
                thunkMiddleware,
                routerMiddleware(history)
            )
        )
    );
}

function getInitialState(){
    let data = window.localStorage.getItem('app');

    if(!data){
        return undefined;
    }

    let result = JSON.parse(data);

    return {
        tabs: Immutable.List(result.tabs.map(tab => new TabModel(tab))),
        accounts: Immutable.List(result.accounts.map(tab => new AccountModel(tab))),
        ui: Immutable.Map({
            currency: result.currency,
            course: result.course
        })
    };
}
