const express =require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);  
const socketHandler = require('./socketHandler');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath)); // phục vụ các tệp tĩnh từ thư mục public

app.get('/',(req,res)=>{
    res.sendFile(path.join(publicPath,'index.html')); // gửi tệp index.html khi truy cập vào root
})
io.on('connection', (socket) =>{  // khi có người dùng mới kết nối, sẽ gọi hàm socketHandler
    socketHandler(socket, io) 
})

const port = process.env.PORT || 3000;
http.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})