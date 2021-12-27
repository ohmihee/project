//socket.emit은 클라이언트에서 사용시에는 서버로, 서버에서 사용시에는 클라이언트로 데이터 전송
//socket.on은 emit으로 보낸 데이터를 받을 때 사용
// 각 메소드의 첫번째 인자가 같아야 양방향 통신 가능
// 즉 socket.emit('message',message)   // socket.on('message',()=>{})

const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');
function chat(){
//utils의 users에서 할당된 각각의 변수 가져오는 것

//정적 파일은 public 폴더 안에 있는 것을 사용
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'HoneyChat Bot';

// Run when client connects
// io.on('connection',callback) // 유저의 socket연결 첫 단계
//클라이언트가 서버에 socket.on을 통해 접속시 이벤트 
io.on('connection', socket => {
  //io.on('connection')의 콜백함수를 통해 클라이언트에게 발생하는 이벤트 등록 가능
  socket.on('joinRoom', ({ username, room }) => {
    //socket에 대한 이벤트를 on을 통해 받음
    //joinRoom은 방에 참여하는 것 
    //leave는 나가는 것
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Honey Chat!'));
    //emit을 통해 접속한 클라이언트에게 이벤트를 발송

    // Broadcast when a user connects
    //io.emit은 모두에게 전달
    //socket.broadcast.emit()은 방금 막 접속한 유저를 제외하고 모든 유저에게 데이터 전송
    //특정 방에 메시지를 보내려는 경우 // socket.broadcast.to(room).emit()
    //io.to(room).emit()
    // 즉 아래의 코드는 방에 막 입장한 유저를 제외한 나머지 유저들에게만 전송
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  // chatmMessage라는 이벤트 발생시 현재 해당 방에 있는 유저들에게 message형식으로 
  // 유저의 이름과 메시지를 전송
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // disconnect라는 이벤트 발생시
  // 떠난 유저의 id를 user에 할당
  // 방에 있는 유저들에게는 if문의 실행
  // getRoomusers는 아마 해당 방에 존재하는 유저들의 숫자를 세는 것으로 추정
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
        
      });
    }
  });
});
console.log('in');

}
// const PORT = process.env.PORT || 3000;

module.exports = server.listen(3002, chat());
