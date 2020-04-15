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

// 上传图片
router.post('/uploadImg',upload.single('file'),function(req,res,next){
    console.log(req.file,'1111111111111111111111111');
    var fileName = req.file.filename;
    res.send({message:'上传成功',code:200,data:{fileName,showImgUrl:'/images/'+fileName}});
});

// 删除图片 根据文件名删除图片
router.post('/deleteImg',function(req,res,next){
    var fileName = req.body.fileName;
    var filePath = path.join(__dirname,'../public/images'+'/'+fileName);
    fs.unlink(filePath,(error)=>{
        if(error){
            res.send({message:'faild',code:3000,error})
        }else{
            res.send({message:'删除成功',code:200})
        }
    })
});

module.exports = router;
