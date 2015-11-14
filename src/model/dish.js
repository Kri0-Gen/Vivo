/*
-Id
-Name
-Cost
-Category (связь)
 */
var mongoose=require('mongoose');
var url =require('url');
var db=require('../db/db');
var dishSchem=mongoose.Schema({
    Id:Number,
    Name:String,
    Cost:Number,
    Category:String
});
module.exports = function(){};