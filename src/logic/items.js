import { setState } from '../state/state';

export function createItem(name) {
  setState(state => {
    const project = state.projects.find(
      p => p.id === state.activeProjectId
    );
    if (!project) return;

    const item = {
      id: crypto.randomUUID(),
      name,
      todos: []
    };

    project.items.push(item);
    state.activeItemId = item.id;
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
