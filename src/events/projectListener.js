import { createProject } from '../logic/projects';

export function setupProjectListeners(){
     const addProjectBtn = document.getElementById('add-project-btn');
  const dialog = document.getElementById('proj-dialog');

  if (!addProjectBtn || !dialog) {
    console.error('Project button or dialog not found');
    return;
  }

  addProjectBtn.addEventListener('click', () => {
    dialog.showModal();
  });
const projForm=document.getElementById('proj-form');
projForm.addEventListener('submit', (e) => {
 e.preventDefault();
    const projTitle=document.getElementById('proj-title')
    const projPriority=document.getElementById('proj-priority')
    const projDescription=document.getElementById('proj-description')
    createProject(projTitle.value,projPriority.value,projDescription.value);

    projTitle.value='';
    projPriority.value='';
    projDescription.value='';
     dialog.close();
    
    
});
}