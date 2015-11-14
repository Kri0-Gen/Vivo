/*
-Id
-Dishes {array}
-Order_Id
-status
 */
var mongoose=require('mongoose');
var url =require('url');
var db=require('../db/db');
var roomSchem=mongoose.Schema({
    Id:Number,
    Dishes:Array,
    Order_Id:Number,
    Status:String
});
module.exports = function(){};