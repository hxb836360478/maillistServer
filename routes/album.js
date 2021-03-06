var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysql');
var multer = require('multer');
var UUID = require('uuid');
var path = require('path');
var fs = require('fs');
// 对上传的文件进行配置
var storage = multer.diskStorage({
    // 指定文件上传的路径
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/images'))
    },
    // 指定上传图片的名称
    filename:function(req,file,cb){
        var fileName = UUID.v1();
        var fileType = file.originalname.slice(file.originalname.lastIndexOf('.'));
        cb(null,fileName+fileType);
    }
});
var upload = multer({storage})

router.get('/list', function(req, res, next) {
    var username = req.query.username
    var sqlStr = 'SELECT * from album where username='+"'"+username+"'";
    mysql.query(sqlStr,(err,results,fields) => {
        if(err){
            res.send({code:5000,message:'error',err:err})
        }else{
            res.send({code:200,data:results})
        }
    })
});

// 上传图片
router.post('/uploadImg',upload.single('file'),function(req,res,next){
    var name = req.file.filename;
    var url = '/api/images/'+req.file.filename;
    var username = req.body.username;
    var status  = 'done';
    const sqlStr = 'insert into album(url,username,name,status) values(?,?,?,?)';
    var note = [url,username,name,status];
    mysql.query(sqlStr,note,(err,results,fields) => {
          if(err){
            res.send({code:5000,message:'error',err:err})
          }else{
            res.send({code:200,data:'添加成功'})
          }
      })
});

// 删除图片 根据文件名删除图片
router.post('/deleteImg',function(req,res,next){
    var name = req.body.name;
    var uid = req.body.uid;
    console.log(name)
    var filePath = path.join(__dirname,'../public/images'+'/'+name);
    fs.unlink(filePath,(error)=>{
        if(error){
            res.send({message:'faild',code:3000,error})
        }else{
            const sqlStr = 'DELETE FROM album where uid='+uid;
            mysql.query(sqlStr,(err,results,fields) => {
                if(err){
                res.send({code:5000,data:'删除失败',message:'error',err:err})
                }else{
                res.send({code:200,data:'删除成功'})
                }
            })
        }
    })

});

module.exports = router;
