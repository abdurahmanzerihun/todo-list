import { setState } from '../../state/state';
import { createProject,deleteProject,updateProject } from '../../logic/projects';
export function renderProjects(state) {
   const list = document.querySelector('#project-list');
  list.innerHTML = '';

  state.projects.forEach(project => {
    const li = document.createElement('li');
    li.className = 'project-item';
    li.textContent = project.name;

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

  // Create project detail container
  const detailDiv = document.createElement('div');
  detailDiv.className = 'project-detail';

  detailDiv.innerHTML = `
    <p><strong>Description:</strong> ${project.description || 'No description'}</p>
    <p><strong>Priority:</strong> ${project.priority}</p>
  `;

  // Edit button
  let currentEditProjectId = null;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit Project';
  editBtn.className = 'edit-project-btn';
   const updateDialog=document.getElementById('update-dialog');
    const updateForm=document.getElementById('update-form');
  editBtn.addEventListener('click', () => {
   
    currentEditProjectId=project.id;
    document.getElementById('update-title').value = project.name;
  document.getElementById('update-priority').value = project.priority;
  document.getElementById('update-desc').value = project.description;
  
updateDialog.showModal();

  });
 
updateForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const newName=document.getElementById('update-title').value;
  const newPriority=document.getElementById('update-priority').value;
  const newDesc=document.getElementById('update-desc').value;
  if (!currentEditProjectId) return;

  updateProject(currentEditProjectId, newName,newPriority , newDesc);
  updateDialog.close();
})

  detailDiv.appendChild(editBtn);
  container.appendChild(detailDiv);
}

