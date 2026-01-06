# todo-list
# Todo List Application

A simple and responsive Todo List app built using JavaScript and Webpack.

## Live Demo
https://abdurahmanzerihun.githun.io/todo-list/

## Description

This application allows users to create, manage, and organize tasks efficiently. 
The project is built using vanilla JavaScript and bundled with Webpack to demonstrate modular JavaScript development and modern frontend tooling.

## Features

- Add new project
- Add new items under project
- Add new todos under item
- Edit existing tasks
- Delete tasks
- Set priority levels
- Due date support
- Persistent data using localStorage
- Responsive design (mobile & desktop)

## Built With

- JavaScript (ES6+)
- Webpack
- HTML5
- CSS3
- npm

## Project Structure
```bash
todo-list/
├── dist
│   ├── index.html
│   └── main.js
├── src
│   ├── events
│   │   ├── event.js
│   │   ├── itemListener.js
│   │   └── projectListener.js
│   ├── logic
│   │   ├── items.js
│   │   ├── projects.js
│   │   └── todos.js
│   ├── state
│   │   └── state.js
│   └── ui
│   │   ├── display
│   │   │   ├── itemDisplay.js
│   │   │   ├── projectDisplay.js
│   │   │   └── todoDisplay.js
│   │   └── ui.js
│   ├── index.html
│   ├── index.js
│   ├── style.css
└── webpack.config.js

## Installation
To run this project locally, follow these steps:

1. Clone the repository
   ```bash
   git clone https://github.com/abdurahmanzerihun/todo-list.git
2. Navigate to the project folder 
   ```bash
   cd todo-list 
3. Install dependencies
   ```bash
   npm install 
4. Start development server 
   ```bash
   npm run start  
5. Build for Production 
   ```bash
   npm run build
## Deployment (GitHub Pages)
 
```bash
npm run build
npm run deploy

## Author
**Abdurahman Z.**  
Computer Science Student  
