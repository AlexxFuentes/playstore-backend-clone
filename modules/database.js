var mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'playstore';

class Database{
    constructor(){
        mongoose.connect(`mongodb://${servidor}/${db}`, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log('Se conecto a mongo');
        }).catch((error)=>{
            console.log(error);
        });
    }
}

module.exports = new Database();