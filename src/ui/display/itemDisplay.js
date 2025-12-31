// itemDisplay.js
import { renderTodos } from './todoDisplay';
import { updateProject } from '../../logic/projects';
import { deleteItem,updateItem } from '../../logic/items';
import { createTodo } from '../../logic/todos';
import { getState } from '../../state/state';
let currentEditProjectId = null; // keep outside renderItems to persist
let currentEditItemId=null;
let currentCreateTodoId=null;

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
  <div class="project-meta">
    <div class="project-row">
      <span class="label">Desc</span>
      <span class="value">${project.description || 'No description'}</span>
    </div>

    <div class="project-row">
      <span class="label">Priority</span>
      <span class="value priority">${project.priority ||'Normal'}</span>
    </div>

    <div class="project-row">
      <span class="label">Created</span>
      <span class="value">
        ${project.createdAt}
      </span>
    </div>
  </div>
`;


  // Edit project button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit Project';
  editBtn.className = 'edit-project-btn';
//close update-proj modal
  const updateDialog = document.getElementById('update-dialog');
  const closeModal=document.getElementById('close-update-proj-btn');
  closeModal.addEventListener('click',()=>updateDialog.close());
  editBtn.addEventListener('click', () => {
    currentEditProjectId = project.id;
    document.getElementById('update-title').value = project.name;
    document.getElementById('update-priority').value = project.priority;
    document.getElementById('update-desc').value = project.description;

    updateDialog.showModal();
  });
  projectDetails.appendChild(editBtn);
  container.appendChild(projectDetails); //project details container ends here 
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
    const meta=document.createElement('small');

    meta.textContent=`Created At: ${item.createdAt}`

    const addTodoBtn = document.createElement('button');
    addTodoBtn.className = 'add-todo-btn';
    addTodoBtn.textContent = '+ Todo';

//Edit item button
    const editItemBtn = document.createElement('button');
  editItemBtn.textContent = 'Edit Item';
  editItemBtn.className = 'edit-item-btn';
  const updateItemDialog = document.getElementById('update-item-dialog');
  // close update-item dialog
  const closeItemUpdateModal=document.getElementById('close-update-item-btn');
  closeItemUpdateModal.addEventListener('click',()=>updateItemDialog.close());
  editItemBtn .addEventListener('click', () => {
    currentEditItemId = item.id;
    document.getElementById('update-item-input').value = item.name;
   updateItemDialog.showModal();
  });

    //Delete items

     const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'item-delete-btn';
    
        deleteBtn.addEventListener('click', (e) => {
    
          e.stopPropagation();
          const confirmed=confirm(`Are you sure you want delete "${item.name}" ?`)
          if(!confirmed) return ;
          deleteItem(item.id);
        });

    // Create todo in this item
const todoDialog=document.getElementById('todo-dialog');

//Close add-todo dialog
const closeAddTodoDialog=document.getElementById('close-add-todo-btn');
closeAddTodoDialog.addEventListener('click',()=>todoDialog.close());
    addTodoBtn.addEventListener('click',()=>{
      currentCreateTodoId=item.id;
todoDialog.showModal();

    })
  //appending section elements 
   const headerLeft = document.createElement('div');
headerLeft.className = 'section-header-left';
headerLeft.append(title, meta);

const headerRight = document.createElement('div');
headerRight.className = 'section-header-actions';
headerRight.append(deleteBtn, editItemBtn, addTodoBtn);

header.append(headerLeft, headerRight);

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

//Create todos form
const todoForm=document.getElementById('todo-form');
todoForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const todoTitle=document.getElementById('todo-title');
  const todoPriority=document.getElementById('todo-priority');
  const todoDueDate=document.getElementById('due-date');
  const todoDesc=document.getElementById('todo-description');
  createTodo(currentCreateTodoId,todoTitle.value,todoPriority.value,todoDueDate.value,todoDesc.value);
  todoDesc.value='';
  todoDueDate.value='';
  todoPriority.value='';
  todoTitle.value=''
  document.getElementById('todo-dialog').close();
   renderItems(getState()); 
})

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

//Menu toggle 

  const sidebar = document.querySelector('.sidebar');
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
   menuBtn.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
});
