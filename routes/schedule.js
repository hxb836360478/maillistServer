var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysql');

router.get('/list', function(req, res, next) {
  var username = req.query.username
  var sqlStr = 'SELECT * from schedule where username='+"'"+username+"'";
  mysql.query(sqlStr,(err,results,fields) => {
        if(err){
          res.send({code:5000,message:'error',err:err})
        }else{
          res.send({code:200,data:results})
        }
    })
});

router.post('/newContact', function(req, res, next) {
  if(!req.body.id){
    const sqlStr = 'insert into schedule(title,note,remind,username) values(?,?,?,?)';
    var note = [req.body.title,req.body.note,req.body.remind,req.body.username];
    mysql.query(sqlStr,note,(err,results,fields) => {
          if(err){
            res.send({code:5000,message:'error',err:err})
          }else{
            res.send({code:200,data:'添加成功'})
          }
      })
  }else{
    const sqlStr = 'UPDATE schedule SET title = ?,note = ?,remind = ? WHERE id = ?';
    var note = [req.body.title,req.body.note,req.body.remind,req.body.id];
    mysql.query(sqlStr,note,(err,results,fields) => {
          if(err){
            res.send({code:5000,message:'error',err:err})
          }else{
            res.send({code:200,data:'修改成功'})
          }
      })
  }
});
//查询
router.post('/querys', function(req, res, next) {
  var sqlStr = "select * from schedule where 1=1";
  var arr = [];
  if(req.body.username){
    var username = req.body.username;
    sqlStr += " and username like ?";
    arr.push(username);
  }
  if(req.body.title){
    var title = "%"+req.body.title+"%";
    sqlStr += " and title like ?";
    arr.push(title);
  }
  if(req.body.note){
    var note = "%"+req.body.note+"%";
    sqlStr += " and note like ?";
    arr.push(note);
  }
  mysql.query(sqlStr,arr,(err,results,fields) => {
        if(err){
          res.send({code:5000,message:'error',err:err})
        }else{
          res.send({code:200,data:results})
        }
    })
});

router.get('/deleteContact/:id', function(req, res, next) {
  const sqlStr = 'DELETE FROM schedule where id='+req.params.id;
  mysql.query(sqlStr,(err,results,fields) => {
        if(err){
          res.send({code:5000,data:'删除失败',message:'error',err:err})
        }else{
          res.send({code:200,data:'删除成功'})
        }
    })
});
module.exports = router;
