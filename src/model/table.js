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
        unique:false,
        required:true
    },
    Y:{
        type:Number,
        unique:false,
        required:true
    },
    Type:{
        type:Number,
        unique:false,
        required:true
    },
    Chairs:{
        type:Number,
        unique:false,
        required:true
    },
    RoomId:{
        type:Number,
        unique:false,
        required:true
            },
    Angle: {
        type: Number,
        unique: false,
        require: true
    }
});

var bind = function(app){
    app.post('/tables/store', function(req, res) {
        //for?

        for(var i=0;i<req.body.tables.length;i++)
            {
                req.body.tables[i].Id = parseInt(req.body.tables[i].Id || '0', 10);
                var tableId = req.body.tables[i].Id;
                var table = db.model('tables', tableSchem);
                var create = function (tableDesc) {
                    var tablePostedElem = new table(tableDesc);
                    tablePostedElem.save();
                };
                if (tableId) {
                    db.collection('tables').remove({Id: parseInt(tableId, 10)});
                    create(req.body.tables[i]);
                }
                else {
                    var closureFunc = function(tableDesc) {
                        db.getNextSequence('tableid', function (id) {
                            tableDesc.Id = id;
                            create(tableDesc);

                        })
                    };
                    closureFunc(req.body.tables[i]);
                }
                //\for?
            }
            res.end('OK');
        })
        .get('/tables/list', function(req, res){
            var roomId = req.query['id'];
            db.collection('tables').find({RoomId:parseInt(roomId, 10)}).toArray().then(function(data){

                res.json(data);
            });

        });
};

module.exports = bind;