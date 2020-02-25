const express = require('express')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './static/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
var upload = multer({ storage: storage })
/**
 * @api {post} /file/upload uploadFile
 * @apiName upload
 * @apiGroup File
 *
 * @apiParam {logo} logo file.
 * 
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/upload',upload.single('logo'),(req,res) => {
    let {size,mimetype,path} = req.file
    let types = ['jpeg','png','gif','jpg'],
    tmpType = mimetype.split('/')
    tmpType = tmpType[tmpType.length-1]
    if(size>500000) {
        return res.send({err:-1,msg:"尺寸过大"})
    }else if(types.indexOf(tmpType) == -1) {
        return res.send({err:-1,msg:"上传文件类型格式不正确"})
    }else {
        let url = `/public/img/${req.file.filename}.${tmpType}`
        res.send({err:0,msg:"上传ok",img:url})
    }
})
module.exports = router