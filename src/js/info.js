const nameText = document.querySelector('.name');

const nameForm = document.querySelector('.nameForm');
const nameInput = document.querySelector('.nameInput');

const todoForm = document.querySelector('.todoForm');
const todoInput = document.querySelector('.todoInput');

function infoInit() {
  let name = localStorage.getItem('name');
  if(name !== null) {
    greeting(JSON.parse(name));
  }

  nameForm.addEventListener("submit", handleName);
}

function greeting(name) {
  nameText.innerText = `Hello! ${name}`;
  nameForm.classList.add("inactiveForm");
  todoForm.classList.remove('inactiveForm');
}

function handleName(e) {
  e.preventDefault();

  localStorage.setItem('name',JSON.stringify(nameInput.value));
  greeting(nameInput.value);
  nameInput.value = '';
}

infoInit()