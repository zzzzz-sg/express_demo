const express = require('express')
const foodModel = require('../db/model/foodModel')
var router = express.Router()

/**
 * @api {post} /food/add addFood
 * @apiName addFood
 * @apiGroup Food
 *
 * @apiParam {String} name food name.
 * @apiParam {String} price food price.
 * @apiParam {String} desc food desc.
 * @apiParam {String} typeName food typeName.
 * @apiParam {Number} typeId food typeId.
 * @apiParam {String} img food img.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add',(req,res) => {
    // let data = {
    //     name:'羊肉串',
    //     price:'9999',
    //     desc:'新疆阿里巴巴羊肉串',
    //     typeName:'烧烤',
    //     typeId:1,
    //     img:'/public/meat.jpg',
    // }
    let {name,price,desc,typeName,typeId,img} = req.body
    foodModel.insertMany({name,price,desc,typeName,typeId,img})
    .then((dara) => {
        res.send({err:0,msg:"add success"})
    })
    .catch((err) => {
        res.send({err:-1,msg:"add error"})
    })
})

/**
 * @api {post} /food/getTypeById getType
 * @apiName getType
 * @apiGroup Food
 *
 * @apiParam {Number} typeId food typeId.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getTypeById',(req,res) => {
    let {typeId} = req.body
    foodModel.find({typeId})
    .then((data) => {
        res.send({err:0,msg:"查询成功",list:data})
    })
    .catch((err) => {
        res.send({err:-1,msg:"查询失败"})
    })
})

/**
 * @api {post} /food/getTypeByKw getFood
 * @apiName getTypeByKw
 * @apiGroup Food
 *
 * @apiParam {Number} kw food kw.
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getTypeByKw',(req,res) => {
    let {kw} = req.body
    let reg = new RegExp(kw)
    foodModel.find({name:{$regex:reg}})
    .then((data) => {
        res.send({err:0,msg:"查询成功",list:data})
    })
    .catch((err) => {
        res.send({err:-1,msg:"查询失败"})
    })
})
/**
 * @api {post} /food/del delFood
 * @apiName del
 * @apiGroup Food
 *
 * @apiParam {id} id foodId .
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/del',(req,res) => {
    let {id} = req.body
    foodModel.deleteOne({_id:id})
    .then((data) => {
        res.send({err:0,msg:"删除成功"})
    })
    .catch((err) => {
        res.send({err:-1,msg:"删除失败"})
    })
})
/**
 * @api {post} /food/update updateFood
 * @apiName update
 * @apiGroup Food
 *
 * @apiParam {name} id foodName.
 * @apiParam {price} id foodPrice.
 * @apiParam {desc} id foodDesc.
 * @apiParam {typeName} id foodTypeName.
 * @apiParam {typeId} id foodTypeId.
 * @apiParam {img} id foodImg.
 * @apiParam {id} id foodId.
 * 
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/update',(req,res) => {
    let {name,price,desc,typeName,typeId,img,id} = req.body
    foodModel.updateOne({_id:id},{name,price,desc,typeName,typeId,img})
    .then((data) => {
        res.send({err:0,msg:"修改成功"})
    })
    .catch((err) => {
        res.send({err:-1,msg:"修改失败"})
    })
})
//分页查询
/**
 * @api {post} /food/getFoodByPage PageFood
 * @apiName getFoodByPage
 * @apiGroup Food
 *
 * @apiParam {pageSize} pageSize 默认为5,查询数量.
 * @apiParam {page} page 默认为1,查询页码.
 * 
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getFoodByPage',(req,res) => {
    let {pageSize = 5,page = 1} = req.body
    foodModel.find().limit(Number(pageSize)).skip(Number((page-1)*pageSize))
    .then((data) => {
        res.send({err:0,msg:"获取成功",list:data})
    })
    .catch((err) => {
        res.send({err:-1,msg:"获取失败"})
    })
})
module.exports = router

