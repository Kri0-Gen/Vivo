/*
-Id
-x
-y
-Type
-Chairs
-roomId
 */
var mongoose=require('mongoose');
var url =require('url');
var db=require('../db/db');
var tableSchem=mongoose.Schema({
    Id:{
        type:Number,
        unique:true,
        required:true
    },
    X:{
        type:Number,
        unique:true,
        required:true
    },
    Y:{
        type:Number,
        unique:true,
        required:true
    },
    Type:{
        type:Number,
        unique:true,
        required:true
    },
    Chairs:{
        type:Number,
        unique:true,
        required:true
    },
    RoomId:{
        type:Number,
        unique:true,
        required:true
            }
});

var bind = function(app){
    app.post('/tables/store', function(req, res) {
            req.body.Id = parseInt(req.body.Id || '0', 10);
            var tableId = req.body.Id;
            var table = db.model('tables', tableSchem);
            var create = function(){
                var tablePostedElem = new table(req.body);
                tablePostedElem.save();
            };
            if (tableId) {
                db.collection('tables').remove({Id: parseInt(tableId, 10)});
                create();
                res.end('OK');
            }
            else {
                db.getNextSequence('tableid', function(id){
                    req.body.Id = id;
                    create();
                    res.end('OK');
                })
            }

        })
        .get('/tables/list', function(req, res){
            db.collection('tables').find().toArray().then(function(data){

                res.json(data);
            });

        });
};

module.exports = bind;