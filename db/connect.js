const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/run',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//mongoose数据库连接对象
var db = mongoose.connection

db.on('err',console.error.bind(console,'connection errors'))
db.once('open',() =>{
    console.log('db ok')
})