const formatMessage = require("./utils/formatMessage");

module.exports = (socket,io) =>{   //  được gọi mỗi khi có người mới truy cập vào app (1 user = 1 socket)
     console.log('A user connected')
     const user = `User-${socket.id.slice(0,5)}`;   // tạo tên người dùng dựa trên ID của socket, chỉ lấy 5 ký tự đầu tiên

    socket.on('chat message',(msg)=>{   // lắng nghe sự kiện 'chat message' từ client 
        const formattedMessage = formatMessage(user, msg, socket.id);
        io.emit('chat message',formattedMessage);  // gửi tin nhắn đến tất cả người dùng
    });

    socket.on('typing',(isTyping)=>{
        if(isTyping){
            socket.broadcast.emit('typing',`${user}`)
        }else{
            socket.broadcast.emit('stop-typing',user); // gửi thông báo không còn gõ nữa
        }
    })
    socket.on('disconnect',()=>{
        console.log('A user disconnected');
        
    });
}