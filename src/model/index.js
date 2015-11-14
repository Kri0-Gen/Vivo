var fs = require('fs');
var path = require('path');
var db=require('../db/db');

db.collection('counters').insert(
   {
      _id: "officiantid",
      seq: 5
   }
);

module.exports = function(app){
   var filelist = fs.readdirSync(__dirname);
   for (var i = 0; i < filelist.length; i++){
      if (/.*\.js$/.test(filelist[i]) && filelist[i] != 'index.js'){
         mod = require(path.join(__dirname, filelist[i]));
         mod(app);
      }
   }
};