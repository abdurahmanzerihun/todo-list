export function renderProjects(state) {
  const list = document.querySelector('#project-list');
  list.innerHTML = '';

  state.projects.forEach(project => {
    
    const li1 = document.createElement('li');
    li1.textContent = project.name;
    li1.dataset.id = project.id;
    const li2 =document.createElement('li');
    li2.textContent=project.priority;
    const li3=document.createElement('li');
    li3.textContent=project.description;
    

    if (project.id === state.activeProjectId) {
      li1.classList.add('active');
    }

    list.appendChild(li1);
    list.appendChild(li2);
    list.appendChild(li3);
   
  });
}
