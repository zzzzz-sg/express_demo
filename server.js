const express = require('express')
const path = require('path')
const db = require('./db/connect')
const app = express()
const cookie = require('cookie-parser')
const session = require('express-session')

app.use(session({
    secret:'dsadas',
    cookie:{maxAge:60*1000*60},
    resave:true,
    saveUninitialized:false
}))
app.use('/public',express.static(path.join(__dirname,'./static')))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


let port = process.env.port || 9092
const userRouter = require('./router/userRouter')
app.use('/user',(req,res,next) => {
    console.log(req.session)
    next()
},userRouter)

//食品路由
const foodRouter = require('./router/foodRouter')
app.use('/food',foodRouter)

const fileRouter = require('./router/fileRouter')
app.use('/file',fileRouter)
app.listen(port,() =>{
    console.log(`server started in ${port}`)
})