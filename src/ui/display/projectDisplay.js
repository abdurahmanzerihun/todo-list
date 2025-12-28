import { setState } from '../../state/state';
import { deleteProject } from '../../logic/projects';
export function renderProjects(state) {
   const list = document.querySelector('#project-list');
  list.innerHTML = '';

  state.projects.forEach(project => {
    const li = document.createElement('li');
    li.className = 'project-item';
    li.innerHTML = `<span class="project-name">${project.name}</span>`
 

    if (project.id === state.activeProjectId) {
      li.classList.add('active');
    }

    // click → activate project
    li.addEventListener('click', () => {
      setState(state => {
        state.activeProjectId = project.id;
      });
    });

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', (e) => {

      e.stopPropagation();
      deleteProject(project.id);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

export function renderActiveProject(state) {
  const container = document.getElementById('section-container');
  const title = document.getElementById('active-project-title');

  container.innerHTML = ''; // clear previous content

  const project = state.projects.find(p => p.id === state.activeProjectId);

  if (!project) {
    title.textContent = 'Select a project';
    return;
  }

  // Update header with project name
  title.textContent = project.name;
}
