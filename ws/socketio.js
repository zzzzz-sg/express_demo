const express = require("express")
const app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)

app.use(express.static(__dirname + "/client"))

io.on("connection",(socket) => {
    setInterval(function () {
        socket.emit("list","abc")
    })
    so
})