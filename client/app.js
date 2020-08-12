const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();

let userName = '';

socket.on('message', ({ author, content }) => addMessage(author, content))
socket.on('newUser', (name) => addMessage('Chat Bot', name))

const login = (event) => {
  event.preventDefault();
  if(!userNameInput.value) {
    alert('Please provide user name')
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('login', { name: userName })
  }
}

loginForm.addEventListener('submit', login);

const sendMessage = (event) => {
  event.preventDefault();
  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
}

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.setAttribute('class', 'message message--received');
  if(author === userName) {
    message.classList.add('message--self')
  } else if(author === 'Chat Bot') {
    message.classList.add('message--bot')
  }

  message.innerHTML = `
    <h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

addMessageForm.addEventListener('submit', sendMessage);