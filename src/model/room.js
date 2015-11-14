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
           res.end('OK');

   })

   .get('/rooms/list', function(req, res){
       db.collection('rooms').find().toArray().then(function(rooms){
          db.collection('tables').find().toArray().then(function(tables){
             var tablesByRoom = {},
                tablesByRoom2 = {};

             tables.forEach(function(item){
                tablesByRoom[item.RoomId] = tablesByRoom[item.RoomId] || [];
                tablesByRoom2[item.RoomId] = tablesByRoom2[item.RoomId] || {};
                tablesByRoom[item.RoomId].push(item);
                tablesByRoom2[item.RoomId][item.Id] = 1;
             });
             db.collection('dishes').find().toArray().then(function(dishes){
                var dishesById = {};
                dishes.forEach(function(item){
                   dishesById[item.Id] = item;
                });
                db.collection('orders').find({Status: 'Open'}).toArray().then(function(orders){
                   var ordersByTable = {};
                   orders.forEach(function(item){
                      ordersByTable[item.Table] = ordersByTable[item.Table] || [];
                      ordersByTable[item.Table].push(item);
                      for (var i in tablesByRoom2){
                         delete tablesByRoom2[i][item.Table];
                      }
                   });
                   res.json(rooms.map(function(room){
                      var totalPlace = 0,
                         totalOpenOrder = 0;
                      if (tablesByRoom[room['Id']]){
                         tablesByRoom[room['Id']].forEach(function(table){
                            totalPlace += parseInt(table.Chairs, 10);
                            if (ordersByTable[table.Id]){
                               ordersByTable[table.Id].forEach(function(item){
                                  item.Order.forEach(function(item){
                                     totalOpenOrder += dishesById[item.Dish].Cost
                                  });
                               });
                            }
                         });
                      }
                      room.totalPlace = totalPlace;
                      room.totalTables = (tablesByRoom[room.Id] || []).length;
                      var obj = tablesByRoom2[room.Id] || {};
                      room.freeTables = room.totalTables - Object.keys(obj).length;
                      room.totalOpenOrder = totalOpenOrder;
                      return room
                   }));
                });
             });
          });
       });

   });
};
module.exports = bind;