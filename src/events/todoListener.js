import { createTodo } from '../logic/todos';

export function setupTodoListeners(){
const todoForm=document.getElementById('todo-form');
todoForm.addEventListener('submit', (e) => {
 e.preventDefault();
    const todoInput=document.getElementById('todo-input')
    const value = todoInput.value; // string;
    createTodo(value);
    todoInput.value = '';
});
}