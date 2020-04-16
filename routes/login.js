var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysql');

//查询
router.post('/loginSystem',function(req,res,next){
  var username = req.body.username;
  var password = req.body.password;
  var sql = 'SELECT * from login where username='+"'"+username+"'";
  mysql.query(sql,function(error,result,fileds){
    if(error){
      res.send({code:4000,message:'faild',error});
    }else if(result.length==0){
      res.send({code:4000,message:'用户不存在！'});
    }else if(password!=result[0].password){
      res.send({code:4000,message:'密码错误'});
    }else{
      res.send({code:200,message:'登录成功',data:result});
    }
  })
});
router.post('/newContact', function(req, res, next) {
  if(!req.body.id){
    const sqlStr = 'insert into login(username,password,phone) values(?,?,?)';
    var note = [req.body.username,req.body.password,req.body.phone];
    mysql.query(sqlStr,note,(err,results,fields) => {
          if(err){
            res.send({code:5000,message:'error',err:err})
          }else{
            res.send({code:200,data:'注册成功'})
          }
      })
  }else{
    const sqlStr = 'UPDATE login SET password = ? WHERE id = ?';
    var note = [req.body.password,req.body.id];
    mysql.query(sqlStr,note,(err,results,fields) => {
          if(err){
            res.send({code:5000,message:'error',err:err})
          }else{
            res.send({code:200,data:'修改密码成功'})
          }
      })
  }
});

module.exports = router;
