/*
-Id
-x
-y
-Type
-Chairs
 */
var mongoose=require('mongoose');
var url =require('url');
var db=require('../db/db');
var tableSchem=mongoose.Schema({
    Id:Number,
    X:Number,
    Y:Number,
    Type:String,
    Chairs:Number
});

var bind = function(app){
    app.post('/tables', function(req, res){
            var tabId = req.query['id'];
            var room= db.model('table',roomSchem);
            room= req.fromJson;
        })
        .get('/tables', function(req, res){
            var tabId = req.query['id'];
              db.collection('tables').find({Id:parseInt(roomId, 10)}).toArray().then(function(data){

                res.json(data);
            });



        });
};


module.exports = function(){};