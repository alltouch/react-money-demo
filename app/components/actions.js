function initialData(){
    var data = window.localStorage.getItem('app');

    return data ? JSON.parse(data) : createData();
}

function createData(){
    return {
        tabs: [{
            key: 0,
            name: 'Total'
        }],
        accounts: [],

        currencies: ['USD', 'EUR'],
        currency: 'All',
        course: 1.1
    };
}

function saveData(data){
    window.localStorage.setItem(
        'app',
        JSON.stringify(data)
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


    editTabName(key, name){
        var tabs = this.state.tabs;
        var tab = tabs.filter(tab => tab.key === key)[0];
        tab.name = name;

        this.setState({
            tabs
        });
    },

    createTab(name = "New Tab"){
        var tabs = this.state.tabs;
        var key = tabs[tabs.length - 1].key + 1;

        if(tabs.filter(tab => tab.name === name).length > 0){
            let index = 1;
            while(tabs.filter(tab => tab.name === name + ' ' + index).length > 0){
                index += 1;
            }
            name = name + ' ' + index;
        }

        tabs.push({
            key,
            name
        });

        this.setState({
            tabs
        });

        return key;
    },

    removeTab(key){
        var tabs = this.state.tabs;
        var active = tabs.filter(tab => tab.key === key)[0];
        var index = tabs.indexOf(active);
        tabs.splice(index, 1);


        this.setState({
            tabs
        });

        return tabs[index - 1].key;
    },

    setCurrency(currency){
        this.setState({
            currency
        });
    },

    addAccount(model){
        model.amount = parseFloat(model.amount);
        var accounts = this.state.accounts;
        var len = accounts.length;

        model.key = len > 0 ? accounts[len - 1].key + 1 : 1;
        accounts.push(model);

        this.setState({
            accounts
        });
    },
    removeAccount(account){
        var accounts = this.state.accounts;
        var index = accounts.indexOf(account);

        accounts.splice(index, 1);

        this.setState({
            accounts
        });
    },
    updateAccount(account, changes){
        var accounts = this.state.accounts;
        var current = accounts.filter(acc => acc.key === account.key)[0];

        current.name = changes.name;
        current.currency = changes.currency;
        current.amount = parseFloat(changes.amount);

        this.setState({
            accounts
        });
    }
};
