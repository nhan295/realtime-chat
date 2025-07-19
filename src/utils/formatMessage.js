function formatMessage(user, text, socketId){
    return {
        username,
        text,
        time: new Date().toLocaleDateString(),
        senderId: socketId // thêm ID của người gửi vào tin nhắn
    }
}
module.exports = formatMessage