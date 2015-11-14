var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/rest');
var dbmon=mongoose.connection;


dbmon.getNextSequence = function(name, cb) {
   dbmon.collection('counters').findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      {
         returnOriginal: false,
         upsert: true
      }, function(err, r){
         if (err) throw err;
         cb(r.value.seq);
      }
   );
};

module.exports=dbmon;