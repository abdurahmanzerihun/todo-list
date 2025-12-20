import { createProject } from '../logic/projects';

export function setupProjectListeners(){
const projForm=document.getElementById('proj-form');
projForm.addEventListener('submit', (e) => {
 e.preventDefault();
    const projInput=document.getElementById('proj-input')
    const value = projInput.value; // string;
    createProject(value);
    projInput.value = '';
});
}