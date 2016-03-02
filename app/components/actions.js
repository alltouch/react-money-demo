import Immutable from 'immutable';
import TabModel from '../models/tab';
import AccountModel from '../models/account';

function initialData(){
    var data = window.localStorage.getItem('app');

    return data ? parseData(data) : createData();
}

function parseData(data){
    var result = JSON.parse(data);

    result.tabs = Immutable.List(result.tabs.map(tab => new TabModel(tab)));
    result.accounts = Immutable.List(result.accounts.map(tab => new AccountModel(tab)));

    return result;
}

function createData(){
    var totalTab = new TabModel({
        id: 0,
        name: 'Total'
    });

    return {
        tabs: Immutable.List.of(totalTab),
        accounts: Immutable.List(),

        currencies: ['USD', 'EUR'],
        currency: 'All',
        course: 1.1
    };
}

function saveData(data){
    var json = Object.assign({}, data);
    json.tabs = json.tabs.toJS();
    json.accounts = json.accounts.toJS();

    window.localStorage.setItem(
        'app',
        JSON.stringify(json)
    );
}

export default {
    state: initialData(),
    observers: [],

    setState(data){
        Object.assign(this.state, data);
        saveData(this.state);
        this.fireObservers(Object.keys(data));
    },
    fireObservers(keys){
        this.observers.forEach((comp) => {
            var changed = keys.filter(function (key) {
               return comp.observes.indexOf(key) > -1;
            });

            if(changed){
                comp.setState(this.getData(changed));
            }
        });
    },
    getData(comp){
        var state = this.state;
        var arr = comp.indexOf ? comp : (comp.observes || []);

        return arr.reduce(function (prev, next) {
            prev[next] = state[next];
            return prev;
        }, {});
    },
    addObserver(comp){
        if(!comp.observes || this.observers.indexOf(comp) > -1){
            return;
        }
        this.observers.push(comp);
    },
    removeObserver(comp){
        if(!comp.observes){
            return;
        }
        var index = this.observers.indexOf(comp);
        if(index === -1){
            return;
        }
        this.observers.splice(index, 1);
    },


    editTabName(id, name){
        var tabs = this.state.tabs;
        var index = tabs.findIndex(tab => tab.id === id);

        this.setState({
            tabs: tabs.update(index, tab => tab.set('name', name))
        });
    },

    createTab(name = "New Tab"){
        var tabs = this.state.tabs;
        var key = tabs.last().id + 1;

        if(tabs.find(tab => tab.name === name)){
            let index = 1;
            while(tabs.find(tab => tab.name === name + ' ' + index)){
                index += 1;
            }
            name = name + ' ' + index;
        }

        var tab = new TabModel({
            id: key,
            name
        });

        this.setState({
            tabs: tabs.push(tab)
        });

        return tab;
    },

    removeTab(id){
        var tabs = this.state.tabs;
        var index = tabs.findIndex(tab => tab.id === id);

        this.setState({
            tabs: tabs.remove(index)
        });

        return tabs.get(index - 1);
    },

    setCurrency(currency){
        this.setState({
            currency
        });
    },

    addAccount(model){
        var accounts = this.state.accounts;
        var len = accounts.size;
        var id = len ? accounts.last().id + 1 : 1;

        model = model.withMutations(function(m){
            m.set('id', id)
             .set('amount', parseFloat(m.amount));
        });

        this.setState({
            accounts: accounts.push(model)
        });
    },
    removeAccount(account){
        var accounts = this.state.accounts;
        var index = accounts.findIndex(acc => acc.id === account.id);

        this.setState({
            accounts: accounts.remove(index)
        });
    },
    updateAccount(account, changes){
        var accounts = this.state.accounts;
        var index = accounts.findIndex(acc => acc.id === account.id);

        accounts = accounts.update(index, function (account) {
            return account.set('name', changes.name)
                    .set('currency', changes.currency)
                    .set('amount', parseFloat(changes.amount));
        });

        this.setState({
            accounts
        });
    }
};
