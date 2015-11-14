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
   app.post('/officiants/store', function(req, res){
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
            { Id: parseInt(req.body.Id, 10) },
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