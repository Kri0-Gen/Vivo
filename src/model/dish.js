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
    Category:{
        type:Number,
        unique:false,
        required:true
    } //свзяь
});
var bind = function(app){
    app.post('/dishes/store', function(req, res) {
            req.body.Id = parseInt(req.body.Id || '0', 10);
            var dishId = req.body.Id;
            var dish = db.model('dishes', dishSchem);
            var create = function(){
                var dishPostedElem = new dish(req.body);
                dishPostedElem.save();
            };
            if (dishId) {
                db.collection('dishes').remove({Id: parseInt(dishId, 10)});
                create();
                res.end('OK');
            }
            else {
                db.getNextSequence('dishid', function(id){
                    req.body.Id = id;
                    create();
                    res.end('OK');
                })
            }


        })
        .post('/dishes/delete', function(req, res) {
            req.body.Id= parseInt(req.body.Id || '0', 10);
            var dishId = req.body.Id;
            db.collection('dishes').remove({Id: parseInt(dishId, 10)});
            res.end('OK');
        })
        .get('/dishes/list', function(req, res){
             db.collection('dishes').find().toArray().then(function(dishes){
                res.json(dishes);
             })
        }).get('/dishes/listByCat', function(req, res){
          db.collection('dishes').find().toArray().then(function(dishes){
             db.collection('dish_cats').find().toArray().then(function(dish_cats){
                var result = {};
                for (var i =0; i < dish_cats.length; i++){
                   result[dish_cats[i]['Id']] = dishes.filter(function(item){
                      return item.Category == dish_cats[i].Id;
                   });
                }
                res.json(result);
             });
          });

       });
};
module.exports = bind;