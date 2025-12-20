// ui/ui.js
import { renderProjects } from './display/projectDisplay';
import { renderItems } from './display/itemDisplay';
import { renderTodos } from './display/todoDisplay';
import { getState } from '../state/state';

export function renderUI() {
  const state = getState();
  renderProjects(state);
  renderItems(state);
  renderTodos(state);
}
