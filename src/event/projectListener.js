import { createProject } from '../logic/projects';
const projForm=document.getElementById('proj-form');
const addItem=document.getElementById('add-item');

projForm.addEventListener('submit', () => {
 e.preventDefault();
    const itemInput=document.getElementById('item-input').value;
    createProject(itemInput);
    input.value = '';
});
//the place where i stop coding(i didnt run this code) !