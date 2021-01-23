const undoList = document.querySelector('.undoList');
const doneList = document.querySelector('.doneList');
const todoForm = document.querySelector('.todoForm');
const todoInput = document.querySelector('.todoInput');

let todos = [];
let itemIndex = 0;

// const todo = [
//   title: string,
//   status: undo | done,
//   id: number
// ]

function init() {

  todoForm.addEventListener("submit",handleTodoInput);

  const savedTodos = localStorage.getItem('todos');

  if(savedTodos !== null) {

    if(savedTodos === []) {
      todos = [];
      return;
    }
    else {
      const todos = JSON.parse(savedTodos);

      todos.forEach(todo => {
        paintItem(todo);
      });
    }
  } 
}

function handleTodoInput(e) {
  e.preventDefault();

  
}

function paintItem(todo) {
  const li = document.createElement('li');
  li.id = itemIndex;
  itemIndex++;
  const deleteBtn = document.createElement('button');
  deleteBtn.addEventListener("click",handleDelete);
}

function handleDelete() {

}

init();