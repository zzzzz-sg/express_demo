const mongoose = require('mongoose')
var foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    desc:{type:String,required:true},
    typeName:{type:String,required:true},
    typeId:{type:Number,required:true},
    img:{type:String,required:true},

})
var Food = mongoose.model('foods',foodSchema)

module.exports = Food