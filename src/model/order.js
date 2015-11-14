/*
-Id
-table(cnt)
-officiant(cnt)
 */
var mongoose=require('mongoose');
var url =require('url');
var db=require('../db/db');
var orderSchem=mongoose.Schema({
    Id:Number,
    Name:String,
    Table:String,
    Officiant:String
});
module.exports = function(){};