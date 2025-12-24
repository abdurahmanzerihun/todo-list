// ui/ui.js
import { renderProjects,renderActiveProject} from './display/projectDisplay';
import { renderItems } from './display/itemDisplay';
import { getState } from '../state/state';

export function renderUI() {
  const state = getState();
  renderProjects(state);
  renderActiveProject(state);
  renderItems(state);
}
