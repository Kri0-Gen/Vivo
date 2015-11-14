/*
-Id
-Name
-Size (vmestimost')
-photo
-tables {array}
 */
var mongoose=require('mongoose');
var url =require('url');
var db=require('../db/db');
var roomSchem=mongoose.Schema({
    Id:Number,
    Name:String,
    Size:Number,
    Photo:String,//?
    Tables:Array
});


var bind = function(app){
   app.post('/rooms/:roomId', function(req, res){
       var list= req.fromJson(':roomId');
       console.log(list);
   })
       .get('/rooms', function(req, res){
           var roomId = req.query['id'];
           db.collection('rooms').find({Id:parseInt(roomId, 10)}).toArray().then(function(data){

               res.json(data);
           });



       });
};
module.exports = bind;