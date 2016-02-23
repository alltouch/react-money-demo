export default {
    init(app){
        this.app = app;
        this.initTabs();
    },
    initTabs(){
        var tabs = ['Всего', 'Банка 1', 'Банка 2'].map((name, index) => {
            return {
                key: index,
                name,
                active: index === 0,
                accounts: []
            };
        });

        this.setState({
            tabs,
            accounts: this.calculateAccounts(tabs)
        }, true);
    },
    setState(data, onInit){
        if(onInit){
            this.app.state = data;
        } else {
            this.app.setState(data);
        }
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
        this.setState({
            tabs
        });
        this.selectTab(key);

    },
    selectTab(key){
        var tabs = this.getState().tabs;
        tabs.filter(tab => tab.active).forEach(tab => tab.active = false);
        tabs.filter(tab => tab.key === key).forEach(tab => tab.active = true);

        this.setState({
            tabs,
            accounts: this.calculateAccounts(tabs)
        });
    },

    calculateAccounts(tabs){
        var active = tabs.filter(tab => tab.active)[0];

        return [{
            key: 'xx',
            tabName: active.name,
            name: 'test name ',
            amount: active.accounts.length,
            currency: 'USD'
        }];
    }
};
