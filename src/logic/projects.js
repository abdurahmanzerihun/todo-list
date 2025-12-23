import { setState } from '../state/state';

export function createProject(name,priority,description) {
  setState(state => {
    const project = {
      id: crypto.randomUUID(),
      name,
      priority,
      description,
      items: []
    };

    state.projects.push(project);
    state.activeProjectId = project.id;
    state.activeItemId = null;
  });
}

export function updateProject(id, name,priority,description) {
  setState(state => {
    const project = state.projects.find(p => p.id === id);
    if (!project) return;
    project.name = name;
    project.priority=priority;
    project.description=description;
  });
}

export function deleteProject(id) {
  setState(state => {
    state.projects = state.projects.filter(p => p.id !== id);
    if (state.activeProjectId === id) {
      state.activeProjectId = null;
      state.activeItemId = null;
    }
  });
}
