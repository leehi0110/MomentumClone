const undosList = document.querySelector('.undoList');
const donesList = document.querySelector('.doneList');
const todosForm = document.querySelector('.todoForm');
const todosInput = document.querySelector('.todoInput');

let todos = [];
let itemIndex = 0;

function init() {
  loadTodos();
  loadIndex();
  todosForm.addEventListener('submit',handleSubmit);
}

function loadTodos() {
  const getTodos = localStorage.getItem('todos');

  if(getTodos !== null) {
    const parsedTodos = JSON.parse(getTodos);
    todos = parsedTodos;
  }

  todos.forEach(todo => paintTodo(todo));
}

function loadIndex() {
  const getIndex = localStorage.getItem('index');

  if(getIndex !== null) {
    itemIndex = JSON.parse(getIndex);
  }
}

function saveTodos() {
  localStorage.setItem('todos',JSON.stringify(todos));
}

function saveIndex() {
  localStorage.setItem('index',JSON.stringify(itemIndex));
}

function paintTodo(todo) {
  const li = document.createElement('li');
  const span = document.createElement('span')
  const statusBtn = document.createElement('button');
  const delBtn = document.createElement('button');

  li.id = todo.id;

  span.innerText = todo.title;
  
  statusBtn.addEventListener('click',handleStatus);

  delBtn.innerText = 'Delete';
  delBtn.addEventListener('click',handleDelete);

  li.appendChild(span);
  li.appendChild(statusBtn);
  li.appendChild(delBtn);
  
  if(todo.status === 'undo') {
    statusBtn.innerText = 'Done';
    undosList.appendChild(li);
  } else {
    statusBtn.innerText = 'Undo';
    donesList.appendChild(li);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const newTodoTitle = todoInput.value;
  const newObj = {
    title: newTodoTitle,
    status: 'undo',
    id: itemIndex,
  }
  itemIndex++;

  todos.push(newObj);
  todoInput.value = '';
  paintTodo(newObj);
  saveTodos();
  saveIndex();
}

function handleStatus(e) {
  const target = e.target.parentNode;
  const targetId = target.id;
  const targetParent = target.parentNode;

  
  todos.forEach(todo => {
    if(todo.id === parseInt(targetId)) {
      todo.status === 'undo' ? todo.status = 'done' : todo.status = 'undo';
      paintTodo(todo);
    }
  });

  targetParent.removeChild(target);
  saveTodos();
}

function handleDelete(e) {
  const target = e.target.parentNode;
  const targetId = target.id;
  const targetParent = target.parentNode;

  targetParent.removeChild(target);

  const newTodos = todos.filter(todo =>todo.id !== parseInt(targetId));

  todos = newTodos;
  saveTodos();
}

init();