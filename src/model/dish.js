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
        unique:true,
        required:true
    },
    Category:{
        type:Number, //ID категории  что-то вроде db.collection('categories')./.../.Id
        unique:true,
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
        .get('/dishes/list', function(req, res){
            var dishId = req.query['id'];
            db.collection('dishes').find({Id:parseInt(dishId, 10)}).toArray().then(function(data){

                res.json(data);
            });

        });
};
module.exports = bind;