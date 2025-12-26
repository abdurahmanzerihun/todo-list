// display/todoDisplay.js
import { deleteTodo, toggleTodo } from '../../logic/todos';

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
    meta.textContent = `${todo.priority} · ${todo.dueDate ?? 'No date'} ${todo.description}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => {
      deleteTodo(item.id, todo.id);
    });

    li.append(checkbox, title, meta, deleteBtn);
    container.appendChild(li);
  });
}
