import { setState } from '../../state/state';
import { deleteProject } from '../../logic/projects';

export function renderProjects(state) {
  const list = document.querySelector('#project-list');
  list.innerHTML = '';

  state.projects.forEach(project => {
    const li = document.createElement('li');
    li.className = 'project-item';
    li.innerHTML = `<span class="project-name">${project.name}</span>`;

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

    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();

      const confirmed = confirm(
        `Are you sure you want to delete "${project.name}"?`
      );
      if (!confirmed) return;

      deleteProject(project.id);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

export function renderActiveProject(state) {
  const container = document.getElementById('section-container');
  const title = document.getElementById('active-project-title');
  const header = document.querySelector('.content-header');
  const emptyHeader = document.querySelector('.empty-header');
  const addSectionBtn = document.getElementById('add-item-btn');

  // Clear previous sections
  container.innerHTML = '';

  // Find the active project
  const project = state.projects.find(
    p => p.id === state.activeProjectId
  );

  if (!project) {
    // Empty state 
    title.textContent = 'No project selected';
    if (addSectionBtn) addSectionBtn.disabled = true;

    header.classList.add('empty');
    if (emptyHeader) emptyHeader.style.display = 'flex'; // show empty-header
    return;
  }

  // Active project state 
  title.textContent = project.name;
  if (addSectionBtn) addSectionBtn.disabled = false;

  header.classList.remove('empty');
  if (emptyHeader) emptyHeader.style.display = 'none';

  // Sections will render here
}

// Menu toggle
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar'); // fresh reference
  if (!sidebar) return;

  sidebar.classList.toggle('open');
  menuBtn.textContent = sidebar.classList.contains('open') ? 'X' : '☰';
});
