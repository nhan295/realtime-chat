const express =require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);  
const socketHandler = require('./socketHandler');

app.use(express.static('public'));

io.on('connection', (socket) =>{  // khi có người dùng mới kết nối, sẽ gọi hàm socketHandler
    socketHandler(socket, io) 
})

const port = process.env.PORT || 3000;
http.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})