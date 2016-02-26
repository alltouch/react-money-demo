export default {
    init(app){
        this.app = app;
        this.initTabs();
    },
    initTabs(){
        var data = window.localStorage.getItem('app');
        if(data){
            this.setState(JSON.parse(data), true);
            return;
        }

        var tabs = ['Всего'].map((name, index) => {
            return {
                key: index,
                name,
                active: index === 0,
                accounts: []
            };
        });

        this.setState({
            tabs,
            currencies: ['USD', 'EUR'],
            currenciesUI: ['All', 'USD', 'EUR'],
            currency: 'All',
            course: 1.1,
            showDialog: false
        }, true);
    },
    setState(data, onInit){
        if(onInit){
            this.app.state = data;
        } else {
            this.app.setState(data);
        }
        window.localStorage.setItem('app', JSON.stringify(this.app.state));
    },
    getState(){
        return this.app.state;
    },
    createTab(name = "New Tab"){
        var tabs = this.getState().tabs;
        var key = tabs.length;



        if(tabs.filter(tab => tab.name === name).length > 0){
            let index = 1;
            while(tabs.filter(tab => tab.name === name + ' ' + index).length > 0){
                index += 1;
            }
            name = name + ' ' + index;
        }


        tabs.push({
            key,
            name,
            active: false,
            accounts: []
        });
        this.updateTabs(tabs);
        this.selectTab(key);

    },
    selectTab(key){
        var tabs = this.getState().tabs;
        tabs.filter(tab => tab.active).forEach(tab => tab.active = false);
        tabs.filter(tab => tab.key === key).forEach(tab => tab.active = true);

        this.updateTabs(tabs);
    },

    updateTabs(tabs){
        this.setState({
            tabs
        });
    },

    removeOpenedTab(){
        var tabs = this.getState().tabs;
        var active = tabs.filter(tab => tab.active)[0];
        var index = tabs.indexOf(active);
        tabs.splice(index, 1);

        tabs[index - 1].active = true;

        this.setState({
           tabs
        });
    },

    editTabName(key, name){
        var tabs = this.getState().tabs;
        var tab = tabs.filter(tab => tab.key === key)[0];
        tab.name = name;

        this.setState({
            tabs
        });
    },

    setCurrency(currency){
        this.setState({
            currency
        });
    },

    calculateAccounts(){
        var state = this.getState();
        var active = state.tabs.filter(tab => tab.active)[0];
        var currency = state.currency;

        function getDataForTab(tab){
            return tab.accounts
                      .filter(account => ['All', account.currency].indexOf(currency) > -1)
                      .map(account => {
                            return Object.assign(
                                {},
                                account,
                                {
                                    tableKey: '' + account.tabKey + '.' + account.key,
                                    tabName: tab.name
                                }
                            );
                      });
        }

        if(active.key === 0){
            var result = [];

            state.tabs.filter(tab => !tab.active)
                 .forEach(tab => {
                    result = result.concat(getDataForTab(tab));
                 });

            return result;
        }

        return getDataForTab(active);
    },

    showAddDialog(){
        this.setState({
            showDialog: true
        })
    },

    hideAddDialog(){
        this.setState({
            showDialog: false
        })
    },

    addAccount(model){
        model.amount = parseFloat(model.amount);
        var tabs = this.getState().tabs;
        var activeTab = tabs.filter(tab => tab.active)[0];
        var len = activeTab.accounts.length;

        model.tabKey = activeTab.key;
        model.key = len > 0 ? activeTab.accounts[len - 1].key + 1 : 1;
        activeTab.accounts.push(model);

        this.setState({
            tabs
        });
        this.hideAddDialog();
    },

    removeAccount(account){
        var tabs = this.getState().tabs;
        var currentTab = tabs.filter(tab => tab.key === account.tabKey)[0];
        var currentAccount = currentTab.accounts.filter(acc => acc.key === account.key)[0];
        var index = currentTab.accounts.indexOf(currentAccount);

        currentTab.accounts.splice(index, 1);

        this.setState({
            tabs
        });
    },

    updateAccount(account, obj){

        var tabs = this.getState().tabs;
        var currentTab = tabs.filter(tab => tab.key === account.tabKey)[0];
        var currentAccount = currentTab.accounts.filter(acc => acc.key === account.key)[0];

        currentAccount.name = obj.name;
        currentAccount.currency = obj.currency;
        currentAccount.amount = obj.amount;

        this.setState({
            tabs
        });

    }
};
