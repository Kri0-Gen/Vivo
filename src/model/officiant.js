/*
-FIO
-Id
 */

var mongoose=require('mongoose');
var url =require('url');
var db=require('../db/db');



module.exports = function(app){
   app.get('/officiants/list', function(req, res){
      db.collection('officiants').find().toArray().then(function(data){
         res.json(data);
      });
   });
   app.post('/officiants/delete',function(req, res){
      var OfficiantId=req.body.Id;
      db.collection('officiants').remove({Id:parseInt(OfficiantId,10)});
       res.send('OK')
   });
   app.post('/officiants/store', function(req, res){
      req.body.Id = parseInt(req.body.Id || '0', 10);
      if (!req.body.Id){
         // insert new one
         db.getNextSequence('officiantid', function(id){
            db.collection('officiants').insertOne({
               'Id': id,
               'FirstName': req.body.FirstName,
               'LastName': req.body.LastName
            });
            res.end('OK');
         });
      }
      else {
         db.collection('officiants').findOneAndUpdate(
            { Id: req.body.Id },
            {
               $set: {
                  'FirstName': req.body.FirstName,
                  'LastName': req.body.LastName
               }
            },
            {
               returnOriginal: true,
               upsert: true
            }, function(err, r){
               if (err) throw err;
               res.end('OK');
            }
         );
         // update
      }
   });
};