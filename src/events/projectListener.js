import { createProject } from '../logic/projects';

export function setupProjectListeners(){
const projForm=document.getElementById('proj-form');
projForm.addEventListener('submit', (e) => {
 e.preventDefault();
    const projTitle=document.getElementById('proj-title')
    const projPriority=document.getElementById('proj-priority')
    const projDescription=document.getElementById('proj-description') // string;
    createProject(projTitle.value,projPriority.value,projDescription.value);

    projTitle.value='';
    projPriority.value='';
    projDescription.value='';
    
    
});
}