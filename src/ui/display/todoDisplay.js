export function renderTodos(state) {
  const project = state.projects.find(
    p => p.id === state.activeProjectId
  );
  if (!project) return;

  const item = project.items.find(
    i => i.id === state.activeItemId
  );

  const list = document.querySelector('#todo-list');
  list.innerHTML = '';

  if (!item) return;

  item.todos.forEach(todo => {
    const todoLi1 = document.createElement('li');
    todoLi1.textContent = todo.title;
    todoLi1.dataset.id = todo.id;
    const todoLi2=document.createElement('li');
    todoLi2.textContent=todo.priority;
    const todoLi3=document.createElement('li');
    todoLi3.textContent=todo.dueDate;
    const todoLi4=document.createElement('li');
    todoLi4.textContent=todo.description;

    if (todo.completed) li.classList.add('done');

    list.appendChild(todoLi1);
    list.appendChild(todoLi2);
    list.appendChild(todoLi3);
    list.appendChild(todoLi4);
  });
}
