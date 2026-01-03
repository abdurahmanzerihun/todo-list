import { createProject } from '../logic/projects';

export function setupProjectListeners() {
  const addProjectBtns = document.querySelectorAll('.add-project-btn');
  const dialog = document.getElementById('proj-dialog');

  // Close modal
  const closeProjDialog = document.getElementById('close-add-proj-btn');
  closeProjDialog.addEventListener('click', () => dialog.close());

  if (!addProjectBtns || !dialog) {
    console.error('Project button or dialog not found');
    return;
  }
//Add project buttons click lister
  addProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dialog.showModal();
    });
  });

  const projForm = document.getElementById('proj-form');
  projForm.addEventListener('submit', e => {
    e.preventDefault();

    const projTitle = document.getElementById('proj-title');
    const projPriority = document.getElementById('proj-priority');
    const projDescription = document.getElementById('proj-description');

    createProject(projTitle.value, projPriority.value, projDescription.value);

    projTitle.value = '';
    projPriority.value = '';
    projDescription.value = '';

    dialog.close();
  });
}
