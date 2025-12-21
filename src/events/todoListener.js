import { createTodo } from '../logic/todos';

export function setupTodoListeners(){
const todoForm=document.getElementById('todo-form');
todoForm.addEventListener('submit', (e) => {
 e.preventDefault();
    const todoInput=document.getElementById('todo-title');
    const todoPriority=document.getElementById('todo-priority');
    const dueDate=document.getElementById('due-date');
    const todoDescription=document.getElementById('todo-description');
    
    createTodo(todoInput.value,todoPriority.value,dueDate.value,todoDescription.value);
    todoInput.value = '';
    todoPriority.value='';
    dueDate.value='';
    todoDescription.value='';
});
}