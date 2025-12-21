import './style.css';

import { subscribe } from './state/state';
import { renderUI } from './ui/ui';
import { setupEvents } from './events/event';

renderUI();                // initial render
subscribe(renderUI);       // re-render on state changes
setupEvents();             // attach event listeners

