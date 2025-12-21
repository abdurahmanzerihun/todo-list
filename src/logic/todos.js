import { setState } from '../state/state';

export function createTodo(title,priority,dueDate,description) {
  setState(state => {
    const project = state.projects.find(
      p => p.id === state.activeProjectId
    );
    if (!project) return;

    const item = project.items.find(
      i => i.id === state.activeItemId
    );
    if (!item) return;

    item.todos.push({
      id: crypto.randomUUID(),
      title,
      priority,
      dueDate,
      description,
      completed: false
    });
  });
}

export function toggleTodo(todoId) {
  setState(state => {
    const item = state.projects
      .find(p => p.id === state.activeProjectId)
      ?.items.find(i => i.id === state.activeItemId);

    const todo = item?.todos.find(t => t.id === todoId);
    if (!todo) return;

    todo.completed = !todo.completed;
  });
}
