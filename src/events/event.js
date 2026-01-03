import { setupProjectListeners } from './projectListener';
import { setupItemListeners } from './itemListener';

export function setupEvents() {
  setupProjectListeners();
  setupItemListeners();
}
