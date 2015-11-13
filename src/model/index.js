var fs = require('fs');
var path = require('path');

module.exports = function(app){
   var filelist = fs.readdirSync(__dirname);
   for (var i = 0; i < filelist.length; i++){
      if (/.*\.js$/.test(filelist[i]) && filelist[i] != 'index.js'){
         mod = require(path.join(__dirname, filelist[i]));
         mod(app);
      }
   }
};