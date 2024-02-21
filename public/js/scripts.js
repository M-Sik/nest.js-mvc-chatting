const soket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//새로운 유저 소켓 접속시 받을 브로드캐스트 이벤트
soket.on('user_connected', (username) => {
  console.log(`${username} connected!`);
});

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);

function helloUser() {
  const username = prompt('What is your name');

  // emit은 보낼때 사용하는 메서드
  soket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
}

init();
