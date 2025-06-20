const formatMessage = require("./utils/formatMessage");

module.exports = (socket,io) =>{
     console.log('A user connected')
     const user = `User-${socket.id.slice(0,5)}`;

    socket.on('chat message',(msg)=>{
        const formattedMessage = formatMessage(user, msg, socket.id);
        io.emit('chat message',formattedMessage);  // gửi tin nhắn đến tất cả người dùng
    });
    socket.on('disconnect',()=>{
        console.log('A user disconnected');
        
    });
}