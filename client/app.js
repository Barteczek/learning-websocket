const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = (event) => {
  event.preventDefault();
  !userNameInput.value ? alert('Please provide user name') : userName = userNameInput.value;
  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
}

loginForm.addEventListener('submit', login);

const sendMessage = (event) => {
  event.preventDefault();
  !messageContentInput.value ? alert('You can\'t send empty message') : addMessage(userName, messageContentInput.value);
  messageContentInput.value = '';
}

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.setAttribute('class', 'message message--received');
  author === userName ? message.classList.add('message--self') : null;
  message.innerHTML = `
    <h3 class="message__author">${author === userName ? 'You' : userName}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

addMessageForm.addEventListener('submit', sendMessage);