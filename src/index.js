import './style.css';

import { subscribe } from './state/state';
import { renderUI } from './ui/ui';
import { setupEvents } from './events/event';

document.addEventListener('DOMContentLoaded',()=>{
 renderUI();                // initial render
subscribe(renderUI);       // re-render on state changes
setupEvents();        
});
          

