/*
-Id
-table(cnt)
-officiant(cnt)
 */
var mongoose=require('mongoose');
var url =require('url');
var db=require('../db/db');
var orderSchem=mongoose.Schema({
   Id:{
      type:Number,
      unique:true,
      required:true
   },
   Table:{
      type:Number,
      unique:false,
      required:true
   },
   Officiant:{
      type:Number,
      unique:false,
      required:true
   },
   Order:{
      type:Array,
      unique:false,
      required:false
   }
});

module.exports = function(){
   app.post('/order/new', function(req, res){
      var order = db.model('orders', orderSchem);
      var create = function(id, data){
         var ordePostedElem = new order({Id: id, Table:data.Table, Officiant:data.Officiant});
         ordePostedElem.save();
      };
      db.getNextSequence('roomid', function(id){
         create(id, )
      });
      res.send('OK');
   });
};