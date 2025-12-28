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

    const meta = document.createElement('small');
    meta.className = 'todo-meta';

    meta.textContent = [
  `Priority: ${todo.priority}`,
  `Due: ${todo.dueDate}` ?? 'No date',
  todo.description ? `Note: ${todo.description}` : null,
].filter(Boolean).join(' · ');

    //Edit todos
  const editTodoBtn=document.createElement('button');
  
  editTodoBtn.className='edit-todo-btn';
  editTodoBtn.textContent="Edit todo";
  const updateTodoDialog=document.getElementById('update-todo-dialog');
  const closeDialog=document.getElementById('close-btn');
  closeDialog.addEventListener('click',()=>updateTodoDialog.close())
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

