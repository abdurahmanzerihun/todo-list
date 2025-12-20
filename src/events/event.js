import { setupProjectListeners } from './projectListener';
import { setupItemListeners } from './itemListener';
import { setupTodoListeners } from './todoListener';

export function setupEvents() {
  setupProjectListeners();
  setupItemListeners();
  setupTodoListeners();
}
