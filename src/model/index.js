var fs = require('fs');
var path = require('path');
var db=require('../db/db');

db.collection('counters').insert(
   {
      _id: "officiantid",
      seq: 5
   }
);
db.collection('counters').insert(
    {
        _id: "roomid",
        seq: 50
    }
);

db.collection('counters').insert({
   _id: "dishid",
    seq: 100
});
db.collection('counters').insert({
    _id: "dish_catid",
    seq: 150
});
db.collection('counters').insert({
   _id: "tableid",
    seq: 250
});

db.collection('counters').insert({
   _id: "orderid",
   seq: 1
});

db.collection('counters').insert({
   _id: "dishorderid",
   seq: 1
});

module.exports = function(app){
   var filelist = fs.readdirSync(__dirname);
   for (var i = 0; i < filelist.length; i++){
      if (/.*\.js$/.test(filelist[i]) && filelist[i] != 'index.js'){
         var mod = require(path.join(__dirname, filelist[i]));
         mod(app);
      }
   }
};
