const WebSocket = require('ws')
const ws = new WebSocket.Server({port:9093},() => {
    console.log('websock started')
})

ws.on('connection',(client) => {
    client.send("zsg so handson")
    client.on('message',(data) => {
        console.log(data)
    })
    client.on('close',(msg) => {
        console.log('前端主动断开连接')
    })
})