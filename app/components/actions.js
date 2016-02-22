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
            tabs
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

    },
    onSelect(key){
        var state = this.getState();
        var tabs = state.tabs;
        tabs.filter(tab => tab.active).forEach(tab => tab.active = false);
        tabs.filter(tab => tab.key === key).forEach(tab => tab.active = true);
        this.setState({
            tabs: tabs
        });
    }
};
