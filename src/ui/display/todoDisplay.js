// display/todoDisplay.js
import { updateTodo,deleteTodo, toggleTodo } from '../../logic/todos';
let currentEditTodoId=null;
let currentEditItemId=null;

export function renderTodos(item, container) {
 
  container.innerHTML = '';

  item.todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      toggleTodo(item.id, todo.id);
    });

    const title = document.createElement('span');
    title.className = 'todo-title';
    title.textContent = todo.title;
//todo prorperty rendering 
   const meta = document.createElement('small');
meta.className = 'todo-meta';

const priority = document.createElement('span');
priority.textContent = `Priority: ${todo.priority || 'Normal'}`;

const due = document.createElement('span');
due.textContent = `Due: ${todo.dueDate || 'No date'}`;

meta.append(priority, ' · ', due);

if (todo.description) {
  const desc = document.createElement('span');
  desc.className = 'todo-desc';
  desc.textContent = `Note: ${todo.description}`;
  meta.append(' · ', desc);
}

    //Edit todos
  const editTodoBtn=document.createElement('button');
  
  editTodoBtn.className='edit-todo-btn';
  editTodoBtn.textContent="Edit todo";
  const updateTodoDialog=document.getElementById('update-todo-dialog');
  //Close update dialog
  const closeDialog=document.getElementById('close-btn');
  closeDialog.addEventListener('click',()=>updateTodoDialog.close());
  editTodoBtn.addEventListener('click',()=>{
    currentEditItemId=item.id;
    currentEditTodoId=todo.id;
    
    document.getElementById('update-todo-title').value = todo.title;
    document.getElementById('update-todo-priority').value=todo.priority;
    document.getElementById('update-due-date').value=todo.dueDate;
    document.getElementById('update-todo-desc').value=todo.description;
    updateTodoDialog.showModal();
  })
  //Delete todos 
    const deleteBtn = document.createElement('button');
    deleteBtn.className='delete-todo-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => {
      const confirmed =confirm(`Are you sure you want to delete "${todo.title}"?`)
      if(!confirmed) return;
      deleteTodo(item.id, todo.id);
    });
//Appending todo-list elements 
const content = document.createElement('div');
content.className = 'todo-content';

const textBlock = document.createElement('div');
textBlock.className = 'todo-text';

textBlock.append(title, meta);

const actions = document.createElement('div');
actions.className = 'todo-actions';
actions.append(editTodoBtn, deleteBtn);

content.append(textBlock, actions);
li.append(checkbox, content);

    container.appendChild(li);
  });
 
}

 const updateTodoForm=document.getElementById('update-todo-form');
updateTodoForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const newTitle=document.getElementById('update-todo-title').value;
  const newPriority=document.getElementById('update-todo-priority').value;
  const newDueDate=document.getElementById('update-due-date').value;
  const newDesc=document.getElementById('update-todo-desc').value;
  updateTodo(currentEditItemId,currentEditTodoId,newTitle,newPriority,newDueDate,newDesc);
  document.getElementById('update-todo-dialog').close();
})

