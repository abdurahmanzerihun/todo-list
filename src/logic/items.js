import { setState } from '../state/state';
import { v4 as uuidv4 } from 'uuid';

export function createItem(name) {
  setState(state => {
    const project = state.projects.find(
      p => p.id === state.activeProjectId
    );
    if (!project) return;

    const item = {
      id: uuidv4(),
      createdAt:new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
       }),
      name,
      todos: []
    };

    project.items.push(item);
    state.activeItemId = item.id;
  });
}
export function updateItem(itemId,newName){
setState(state=>{
  const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) return;
     const item = project.items.find(i => i.id === itemId);
    if (!item) return;
      item.name=newName;
});
}

export function deleteItem(itemId) {
  setState(state => {
    const project = state.projects.find(
      p => p.id === state.activeProjectId
    );
    if (!project) return;

    project.items = project.items.filter(i => i.id !== itemId);
    if (state.activeItemId === itemId) {
      state.activeItemId = null;
    }
  });
}
