import Immutable from 'immutable';

var Data = Immutable.Record({
    id: undefined,
    tabId: undefined,
    tabName: '',
    name: '',
    currency: '',
    amount: 0
});

export default class AccountModel extends Data{
    getKey(){
        return this.id;
    }
}
