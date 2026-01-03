const STORAGE_KEY = 'taskManager';
let subscribers = [];

export function subscribe(fn) {
  subscribers.push(fn);
}

function notify() {
  subscribers.forEach(fn => fn(getState()));
}


let state = load();

function load() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    projects: [],
    activeProjectId: null,
    activeItemId: null
  };
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getState() {
  return structuredClone(state);
}

export function setState(mutator) {
  mutator(state);
  save();
   notify();
}

