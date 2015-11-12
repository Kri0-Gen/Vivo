var bind = function(app){
   app.all('/room/list', function(req, res){
      var list = [{id:1, name: 'Основной зал'}]
      res.json(list);
   });   
};
module.exports = bind;