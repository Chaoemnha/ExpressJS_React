const BaseModel = require('../BmApp/baseModel')
class User extends BaseModel {
    constructor(){
        super('users');
        this._id = '';
        this.name = '';
        this.age = null;
    }

    getDataRaw(){
        let rawData = {};
        rawData._id = this._id;
        rawData.name = this.name;
        rawData.age = this.age;
        return rawData;
    }

    setDataRaw(dataInput){
        this._id = dataInput._id;
        this.name = dataInput.name;
        this.age = dataInput.age;
    }
}

module.exports = User;