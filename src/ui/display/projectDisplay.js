export function renderProjects(state) {
  const list = document.querySelector('#project-list');
  list.innerHTML = '';

  state.projects.forEach(project => {
    const li = document.createElement('li');
    li.textContent = project.name;
    li.dataset.id = project.id;

    if (project.id === state.activeProjectId) {
      li.classList.add('active');
    }

    list.appendChild(li);
   
  });
}
