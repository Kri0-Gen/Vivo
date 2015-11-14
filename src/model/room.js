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
    Id:{
        type:Number,
        unique:true,
        required:true
    },
    Name:{
        type:String,
        unique:false,
        required:true
    },
    Photo:{
        type:String,
        unique:false,
        required:false
    },//?
    Tables:{
        type:Array,
        unique:false,
        required:false
    }
});


var bind = function(app){
   app.post('/rooms/store', function(req, res) {
       req.body.Id = parseInt(req.body.Id || '0', 10);
       var roomId = req.body.Id;

       var room = db.model('rooms', roomSchem);
       var create = function(){
           var roomPostedElem = new room(req.body);
           roomPostedElem.save();
       };
       if (roomId) {
           db.collection('rooms').remove({Id: parseInt(roomId, 10)});
           create();
           res.end('OK');
       }
       else {
            db.getNextSequence('roomid', function(id){
                req.body.Id = id;
                req.body.Tables =
                create();
                res.end('OK');
            })
       }

   })
   .post('/rooms/delete',function(req,res){
       req.body.Id = parseInt(req.body.Id || '0', 10);
       var roomId = req.body.Id;
        db.collection('rooms').remove({Id: parseInt(roomId, 10)});
        db.collection('tables').remove({RoomId: parseInt(12, 10)});
   })

   .get('/rooms/list', function(req, res){

       db.collection('rooms').find().toArray().then(function(data){
           res.json(data);
       });

   });
};
module.exports = bind;