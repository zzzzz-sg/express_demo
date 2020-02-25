"use strict"
const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    //smtp: mugtydxnihiubjeh
    host:"smtp.qq.com",//发送方邮箱。通过改配置文件下lib/well-known可获取
    port:465,//端口号
    secure:true,//true for 465
    auth:{
        user:"460104087@qq.com",
        pass:"mugtydxnihiubjeh"
    }
})
   function sendMail(mail,code) {
    let mailObj = {
        from: '"Fred Foo 👻" <460104087@qq.com>', // sender address
        to: mail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `你的验证码是${code},有效期为60s`, // plain text body
        // html: "<b>Hello world?</b>" // html body
      }
       return new Promise((resolve,reject) => {
        transporter.sendMail(mailObj,(err,data) => {
            if(err) {
                reject()
            }else {
                resolve()
            }
        })
       })
      
        
  }
  module.exports = {
      sendMail
  }
