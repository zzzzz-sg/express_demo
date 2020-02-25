const express = require('express')
var router = express.Router()
const User = require('../db/model/userModel')
const mail = require('../utils/mail')

//内存中保存注册信息
let codes = {}

router.get('/add',(req,res) => {
    res.send('add success')
})

/**
 * @api {post} /user/add signUp
 * @apiName signUp
 * @apiGroup User
 *
 * @apiParam {String} us username.
 * @apiParam {String} ps password.
 * @apiParam {String} code signUpCode.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post('/add',(req,res) => {
    let {us,ps,code} = req.body
    if(us&&ps&&code) {
        if(codes[us]!= code) return res.send({err:-4,msg:"验证码错误"})
        User.find({us})
        .then((data) => {
            if(data.length ===0 ) {
                return User.insertMany({us,ps})
            }else {
                return res.send({err:-3,msg:"用户已存在"})
            }
        })
        .then(() => {
            return res.send({err:0,msg:'注册成功'})
        })
        .catch((err) => {
            return res.send({err:-2,msg:'注册失败'})
        })
    }else {
        res.send({err:-1,msg:'参数错误'})
    }
})

/**
 * @api {post} /user/login signIn
 * @apiName signIn
 * @apiGroup User
 *
 * @apiParam {String} us username.
 * @apiParam {String} ps password.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/login',(req,res) =>{
    let {us,ps} = req.body
    if(us&&ps) {
        User.find({us,ps}).then((data) => {
            if(data.length) {
                res.send({err:0,msg:'登录成功'})
            }else {
                res.send({err:-1,msg:'账号或者密码错误'})
            }
        }).catch((err) => {
            res.send({err:-1,msg:'登录失败'})
        })
    }else {
        res.send({err:-1,msg:'参数错误'})
    }
})

//获取邮箱验证码
/**
 * @api {post} /user/getMailCode getMailCode
 * @apiName getMailCode
 * @apiGroup User
 *
 * @apiParam {String} email user email.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getMailCode',(req,res) =>{
    let {email} = req.body
    let code =parseInt(Math.random()*10000) 
     mail.sendMail(email,code)
     .then((data) => {
         codes[email] = code
         res.send({err:0,msg:"发送成功"})
     })
     .catch((err) => {
         res.send({err:-1,msg:"发送失败"})
     })
})
module.exports = router

