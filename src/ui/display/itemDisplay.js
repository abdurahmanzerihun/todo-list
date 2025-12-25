// itemDisplay.js
import { renderTodos } from './todoDisplay';
import { createTodo } from '../../logic/todos';
import { updateProject } from '../../logic/projects';
import { deleteItem,updateItem } from '../../logic/items';
let currentEditProjectId = null; // keep outside renderItems to persist
let currentEditItemId=null;

export function renderItems(state) {
  const container = document.getElementById('section-container');
  container.innerHTML = '';

  const project = state.projects.find(p => p.id === state.activeProjectId);
  if (!project) return;

  // Update project title in header
  const headerTitle = document.getElementById('active-project-title');
  if (headerTitle) headerTitle.textContent = project.name;

  // Remove old project details if they exist
  const existingDetails = container.querySelector('.project-detail');
  if (existingDetails) existingDetails.remove();

  // Render project properties in main content
  const projectDetails = document.createElement('div');
  projectDetails.className = 'project-detail';
  projectDetails.innerHTML = `
    <p><strong>Description:</strong> ${project.description || 'No description'}</p>
    <p><strong>Priority:</strong> ${project.priority}</p>
  `;

  // Edit project button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit Project';
  editBtn.className = 'edit-project-btn';

  const updateDialog = document.getElementById('update-dialog');
  editBtn.addEventListener('click', () => {
    currentEditProjectId = project.id;
    document.getElementById('update-title').value = project.name;
    document.getElementById('update-priority').value = project.priority;
    document.getElementById('update-desc').value = project.description;

    updateDialog.showModal();
  });
  projectDetails.appendChild(editBtn);
  container.appendChild(projectDetails); 
  // Render sections/items
  project.items.forEach(item => {
    const section = document.createElement('section');
    section.className = 'section';

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';

    const title = document.createElement('h3');
    title.className = 'section-title';
    title.textContent = item.name;

    const addTodoBtn = document.createElement('button');
    addTodoBtn.className = 'add-todo-btn';
    addTodoBtn.textContent = '+ Todo';

//Edit item button
    const editItemBtn = document.createElement('button');
  editItemBtn.textContent = 'Edit Item';
  editItemBtn.className = 'edit-item-btn';

  const updateItemDialog = document.getElementById('update-item-dialog');
  editItemBtn .addEventListener('click', () => {
    currentEditItemId = item.id;
    document.getElementById('update-item-input').value = item.name;
   updateItemDialog.showModal();
  });

    //Delete items

     const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'delete-btn';
    
        deleteBtn.addEventListener('click', (e) => {
    
          e.stopPropagation();
          deleteItem(item.id);
        });

    // Create todo in this item
    addTodoBtn.addEventListener('click', () => {
      createTodo(item.id, 'New Todo', 'medium', null, '');
    });

    header.append(title, deleteBtn,editItemBtn,addTodoBtn);

    // Todo list container
    const todoList = document.createElement('ul');
    todoList.className = 'todo-list';

    // Render todos
    renderTodos(item, todoList);

    section.append(header, todoList);
    container.appendChild(section);
  });
}

// Outside renderItems

//update item form listener 
const updateItemForm=document.getElementById('update-item-form');
const updateItemDialog=document.getElementById('update-item-dialog');
updateItemForm.addEventListener('submit',(e)=>{
  e.preventDefault();
   const newItemName = document.getElementById('update-item-input').value;
  if (!currentEditItemId) return;

  updateItem(currentEditItemId, newItemName);
  updateItemDialog.close();

})

//update project form listener
const updateForm = document.getElementById('update-form');
const updateDialog = document.getElementById('update-dialog');

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newName = document.getElementById('update-title').value;
  const newPriority = document.getElementById('update-priority').value;
  const newDesc = document.getElementById('update-desc').value;

  if (!currentEditProjectId) return;

  updateProject(currentEditProjectId, newName, newPriority, newDesc);
  updateDialog.close();
});
