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

var dishSchem=mongoose.Schema({
   Id:{
      type:Number,
      unique:true,
      required:true
   },
   Name:{
      type:String,
      unique:true,
      required:true
   },
   Cost:{
      type:Number,
      unique:false,
      required:true
   },
   Date:{
      type:Date,
      unique:false,
      required:true
   },
   Category:{
      type:Number,
      unique:false,
      required:true
   } //свзяь
});

module.exports = function(app){
   app.post('/order/new', function(req, res){
      var order = db.model('orders', orderSchem);
      var create = function(data){
         var ordePostedElem = new order(data);
         ordePostedElem.save(function(err, zzz){
            res.json({Id:data.Id});
         });
      };
      db.getNextSequence('orderid', function(id){
         create({
            Id: id,
            Status: 'Open',
            Date: new Date(),
            Table: parseInt(req.body['Table'], 10),
            Officiant: parseInt(req.body['Officiant'], 10) || 0
         });
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
      var orderId = parseInt(req.body.OrderId, 10);
      order.findOne({'Id': orderId}, function(err, ord){
         var f = function(i){
            if (i<req.body.dishes.length){
               db.getNextSequence('dishorderid', function(id){
                  ord.Order.push({
                     DishOrderId: id,
                     Dish: parseInt(req.body.dishes[i], 10),
                     Status: 1
                  });
                  f(i + 1);
               })
            }
            else {
               ord.save();
               res.send('OK');
            }
         };
         f(0);
      });
   });

   app.post('/order/readDishes', function(req, res){
      var order = db.model('orders', orderSchem);
      var orderId = parseInt(req.body.OrderId, 10);
      var dishes = db.model('dishes', dishSchem);
      order.findOne({'Id': orderId}, function(err, ord){
         var dishArr = [];
         for( var i = 0; i < ord.Order.length; i++){
            if (dishArr.indexOf(ord.Order[i].Dish)<0){
               dishArr.push(ord.Order[i].Dish);
            }
         }
         dishes.find({Id: {$in : dishArr}}, function(err, fullDish){
            var dMap = {};
            for (var i = 0; i < fullDish.length; i++){
               dMap[fullDish[i].Id] = fullDish[i];
            }
            res.json(ord.Order.map(function(item){
               item.DishInfo = dMap[item.Dish];
               return item;
            }));
         });
      });
   });

   app.post('/order/changeStatus', function(req, res){
      var order = db.model('orders', orderSchem);
      var orderId = parseInt(req.body.OrderId, 10);
      order.findOne({'Id': orderId}, function(err, ord){
         ord.Status = req.body.Status;
         ord.save();
         res.send('OK');
      });
   });

   app.post('/order/changeDishStatus', function(req, res){
      var order = db.model('orders', orderSchem);
      var orderId = parseInt(req.body.OrderId, 10);
      order.findOne({'Id': orderId}, function(err, ord){
         for( var i = 0; i < ord.Order.length; i++){
            if (ord.Order[i].DishOrderId == parseInt(req.body.DishOrderId, 10)){
               ord.Order[i].Status = parseInt(req.body.Status, 10);
            }
         }
         ord.markModified('Order');
         ord.save(function(err){console.log(err)});
         res.send('OK');
      });
   });
};