export function renderItems(state) {
  const project = state.projects.find(
    p => p.id === state.activeProjectId
  );

  const list = document.querySelector('#item-list');
  list.innerHTML = '';

  if (!project) return;

  project.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    li.dataset.id = item.id;

    if (item.id === state.activeItemId) {
      li.classList.add('active');
    }

    list.appendChild(li);
  });
}
