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
    fillDishes();
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

var fillDishes = function(){
    db.collection('dishes').drop();
    function addDish(index) {
        db.collection('dishes').insertOne(dishArray[index], function () {
            if (index < dishArray.length - 1) {
                addDish(index + 1);
            }
        });
    }
    var dishArray = [{
        'Id': 101,
        'Name': 'Борщ',
        'Cost': 100,
        'Category': 1
    },{
        'Id': 102,
        'Name': 'Щи',
        'Cost': 70,
        'Category': 1
    },{
        'Id': 103,
        'Name': 'Солянка',
        'Cost': 150,
        'Category': 1
    },{
        'Id': 104,
        'Name': 'Гороховый',
        'Cost': 50,
        'Category': 1
    },{
        'Id': 105,
        'Name': 'Цезарь',
        'Cost': 130,
        'Category': 2
    },{
        'Id': 106,
        'Name': 'Греческий',
        'Cost': 80,
        'Category': 2
    },{
        'Id': 107,
        'Name': 'Обжорка',
        'Cost': 75,
        'Category': 2
    },{
        'Id': 108,
        'Name': 'Оливье',
        'Cost': 60,
        'Category': 2
    },{
        'Id': 109,
        'Name': 'Крабовый',
        'Cost': 90,
        'Category': 2
    },{
        'Id': 110,
        'Name': 'Лонгет',
        'Cost': 150,
        'Category': 3
    },{
        'Id': 111,
        'Name': 'Котлета',
        'Cost': 80,
        'Category': 3
    },{
        'Id': 112,
        'Name': 'Поджарка',
        'Cost': 80,
        'Category': 3
    },{
        'Id': 113,
        'Name': 'Жульен',
        'Cost': 120,
        'Category': 3
    },{
        'Id': 114,
        'Name': 'Чипсы',
        'Cost': 40,
        'Category': 4
    },{
        'Id': 115,
        'Name': 'Огурец',
        'Cost': 70,
        'Category': 4
    },{
        'Id': 116,
        'Name': 'Селёдка',
        'Cost': 100,
        'Category': 4
    },{
        'Id': 117,
        'Name': 'Сок',
        'Cost': 50,
        'Category': 5
    },{
        'Id': 118,
        'Name': 'Чай',
        'Cost': 80,
        'Category': 5
    },{
        'Id': 119,
        'Name': 'Кофе',
        'Cost': 90,
        'Category': 5
    },{
        'Id': 120,
        'Name': 'Морс',
        'Cost': 45,
        'Category': 5
    },{
        'Id': 121,
        'Name': 'Виски',
        'Cost': 200,
        'Category': 5
    }];
    addDish(0);
};
