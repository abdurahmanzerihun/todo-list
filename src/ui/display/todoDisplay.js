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
    const li = document.createElement('li');
    li.textContent = todo.title;
    li.dataset.id = todo.id;

    if (todo.completed) li.classList.add('done');

    list.appendChild(li);
  });
}
