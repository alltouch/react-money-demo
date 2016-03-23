import { CREATE_TAB, REMOVE_TAB, RENAME_TAB } from '../constants';
import { push } from 'react-router-redux'

export function createTab(name = "New Tab"){
    return function (dispatch, getState) {
        let tabs = getState().tabs;
        let key = tabs.last().id + 1;

        if(tabs.find(tab => tab.name === name)){
            let index = 1;
            const func = (tab) => tab.name === name + ' ' + index;
            while(tabs.find(func)){
                index += 1;
            }
            name = name + ' ' + index;
        }

        dispatch({
            type: CREATE_TAB,
            id: key,
            name
        });

        let url = getState().tabs.last().getUrl();

        dispatch(push(url));
    };
}

export function removeTab(id){
    return function(dispatch, getState){

        let tabs = getState().tabs;
        let index = tabs.findIndex(tab => tab.id === id);

        dispatch({
            type: REMOVE_TAB,
            id
        });

        let url = tabs.get(index - 1).getUrl();

        dispatch(push(url));

    }

}

export function renameTab(id, name){
    return {
        type: RENAME_TAB,
        id,
        name
    };
}
