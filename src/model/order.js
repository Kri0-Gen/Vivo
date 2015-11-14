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
   Status: {
      type:String,
      unique:false,
      required:true
   },
   Order:{
      type:Array,
      unique:false,
      required:false
   }
});

module.exports = function(app){
   app.post('/order/new', function(req, res){
      var order = db.model('orders', orderSchem);
      var create = function(data){
         var ordePostedElem = new order(data);
         ordePostedElem.save();
      };
      db.getNextSequence('orderid', function(id){
         create({
            Id: id,
            Status: 'Open',
            Table: req.body['Table'],
            Officiant: req.body['Officiant']
         });
         res.send(''+id);
      });
   });

   app.post('/order/appendToOrder', function(req, res){
      /**
       * OrderId
       * [
       *   {
       *      DishId, Status
       *   },
       *   {
       *      DishId, Status
       *   }
       * ]
       * */
      var order = db.model('orders', orderSchem);
      var create = function(data){
         var ordePostedElem = new order(data);
         ordePostedElem.save();
      };
      db.getNextSequence('dishorderid', function(id){
         create({
            Id: id,
            Table: req.body['Table'],
            Officiant: req.body['Officiant']
         })
      });
      res.send('OK');
   });
};