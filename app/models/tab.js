import Immutable from 'immutable';

var Data = Immutable.Record({
    id: undefined,
    name: undefined
});

export default class TabModel extends Data{
    getKey(){
        return this.id;
    }
    isTotal(){
        return this.id === 0;
    }
    getUrl(){
        if(this.isTotal()){
            return '/';
        }
        return '/' + this.id;
    }
};
