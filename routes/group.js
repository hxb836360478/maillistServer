var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysql');
/* GET home page. */
router.get('/list', function(req, res, next) {
  var username = req.query.username
  var sqlStr = 'SELECT * from groups where username='+"'"+username+"'";
  mysql.query(sqlStr,(err,results,fields) => {
        if(err){
          res.send({code:5000,message:'error',err:err})
        }else{
          res.send({code:200,data:results})
        }
    })
});

router.get('/deleteContact/:id', function(req, res, next) {
  const sqlStr = 'DELETE FROM groups where id='+req.params.id;
  mysql.query(sqlStr,(err,results,fields) => {
        if(err){
          res.send({code:5000,data:'删除失败',message:'error',err:err})
        }else{
          res.send({code:200,data:'删除成功'})
        }
    })
});

router.post('/newContact', function(req, res, next) {
    const sqlStr = 'insert into groups(grouping,username) values(?,?)';
    var note = [req.body.grouping,req.body.username];
    mysql.query(sqlStr,note,(err,results,fields) => {
      if(err){
        res.send({code:5000,message:'error',err:err})
      }else{
        res.send({code:200,data:'添加成功'})
      }
    })

});
module.exports = router;
