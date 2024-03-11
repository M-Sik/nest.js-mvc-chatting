const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// *global socket handler
//새로운 유저 소켓 접속시 받을 브로드캐스트 이벤트
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected!`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}: ${chat}`);
});
socket.on('disconnect_user', (username) => drawNewChat(`${username}: bye...`));

// event callback 함수
const handleSubmit = (event) => {
  event.preventDefault();
  const inputVal = event.target.elements[0].value;

  if (inputVal !== '') {
    socket.emit('submit_chat', inputVal);
    // 화면에 그리기
    drawNewChat(`나: ${inputVal}`);
    event.target.elements[0].value = '';
  }
};

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);

const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
        <div>
          ${message}
        </div>
        `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

function helloUser() {
  const username = prompt('What is your name');
  // emit은 보낼때 사용하는 메서드
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  // 입력폼 submit 이벤트 등록
  formElement.addEventListener('submit', handleSubmit);
}

init();
