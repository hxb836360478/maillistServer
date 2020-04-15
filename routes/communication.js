var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysql');
/* GET home page. */
//列表
router.get('/list', function(req, res, next) {
  var username = req.query.username
  var sqlStr = 'SELECT * from communication where username='+"'"+username+"'";
  mysql.query(sqlStr,(err,results,fields) => {
        if(err){
          res.send({code:5000,message:'error',err:err})
        }else{
          res.send({code:200,data:results})
        }
    })
});
//查询
router.post('/querys', function(req, res, next) {
  var sqlStr = "select * from communication where 1=1";
  var arr = [];
  if(req.body.username){
    var username = req.body.username;
    sqlStr += " and username like ?";
    arr.push(username);
  }
  if(req.body.name){
    var name = "%"+req.body.name+"%";
    sqlStr += " and name like ?";
    arr.push(name);
  }
  if(req.body.birthday){
    var birthday = "%"+req.body.birthday+"%";
    sqlStr += " and birthday like ?";
    arr.push(birthday);
  }
  if(req.body.note){
    var note = "%"+req.body.note+"%";
    sqlStr += " and note like ?";
    arr.push(note);
  }
  if(req.body.phoneNumber){
    var phoneNumber = "%"+req.body.phoneNumber+"%";
    sqlStr += " and phoneNumber like ?";
    arr.push(phoneNumber);
  }
  if(req.body.subgroup){
    var subgroup = "%"+req.body.subgroup+"%";
    sqlStr += " and subgroup like ?";
    arr.push(subgroup);
  }
  if(req.body.police){
    var police = "%"+req.body.police+"%";
    sqlStr += " and police like ?";
    arr.push(police);
  }
  mysql.query(sqlStr,arr,(err,results,fields) => {
    console.log(err,results,fields)
        if(err){
          res.send({code:5000,message:'error',err:err})
        }else{
          res.send({code:200,data:results})
        }
    })
});
//新增
router.post('/newContact', function(req, res, next) {
  if(!req.body.id){
    const sqlStr = 'insert into communication(name,birthday,note,phoneNumber,subgroup,police,username) values(?,?,?,?,?,?,?)';
    var note = [req.body.name,req.body.birthday,req.body.note,req.body.phoneNumber,req.body.subgroup,req.body.police,req.body.username];
    mysql.query(sqlStr,note,(err,results,fields) => {
          if(err){
            res.send({code:5000,message:'error',err:err})
          }else{
            res.send({code:200,data:'添加成功'})
          }
      })
  }else{
    const sqlStr = 'UPDATE communication SET name = ?,birthday = ?,note = ?,phoneNumber = ?,subgroup=?,police = ?  WHERE id = ?';
    var note = [req.body.name,req.body.birthday,req.body.note,req.body.phoneNumber,req.body.subgroup,req.body.police,req.body.id];
    mysql.query(sqlStr,note,(err,results,fields) => {
          if(err){
            res.send({code:5000,message:'error',err:err})
          }else{
            res.send({code:200,data:'修改成功'})
          }
      })
  }
});
//删除
router.get('/deleteContact/:id', function(req, res, next) {
  const sqlStr = 'DELETE FROM communication where id='+req.params.id;
  mysql.query(sqlStr,(err,results,fields) => {
        if(err){
          res.send({code:5000,data:'删除失败',message:'error',err:err})
        }else{
          res.send({code:200,data:'删除成功'})
        }
    })
});

module.exports = router;
