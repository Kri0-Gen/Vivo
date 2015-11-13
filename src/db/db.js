var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/rest');
var dbmon=mongoose.connection;

module.exports=dbmon;