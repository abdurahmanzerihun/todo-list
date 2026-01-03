import { setState } from '../state/state';
import { v4 as uuidv4 } from 'uuid';

export function createTodo(itemId, title, priority, dueDate, description) {
  setState(state => {
    const project = state.projects.find(
      p => p.id === state.activeProjectId
    );
    if (!project) return;

    const item = project.items.find(i => i.id === itemId);
    if (!item) return;

    item.todos.push({
      id: uuidv4(),
      title,
      priority,
      dueDate,
      description,
      completed: false
    });
  });
}
export function toggleTodo(itemId, todoId) {
  setState(state => {
    const project = state.projects.find(
      p => p.id === state.activeProjectId
    );
    if (!project) return;

    const item = project.items.find(i => i.id === itemId);
    if (!item) return;

    const todo = item.todos.find(t => t.id === todoId);
    if (!todo) return;

    todo.completed = !todo.completed;
  });
}
export function deleteTodo(itemId, todoId) {
  setState(state => {
    const project = state.projects.find(
      p => p.id === state.activeProjectId
    );
    if (!project) return;

    const item = project.items.find(i => i.id === itemId);
    if (!item) return;

    item.todos = item.todos.filter(t => t.id !== todoId);
  });
}

export function updateTodo(itemId, todoId, newTitle,newPriority,newDueDate,newDesc) {
  setState(state => {
    const project = state.projects.find(
      p => p.id === state.activeProjectId
    );
    if (!project) return;

    const item = project.items.find(i => i.id === itemId);
    if (!item) return;

    const todo = item.todos.find(t => t.id === todoId);
    if (!todo) return;

    todo.title = newTitle;
    todo.priority=newPriority;
    todo.dueDate=newDueDate;
    todo.description=newDesc;
  });
}
