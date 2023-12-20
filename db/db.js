// database.js

// Mock data for projects and todos
const projects = [
    { id: 1, name: 'Shopping List' },
    { id: 2, name: 'Errands' }
  ];
  
  const todos = [
    { id: 1, project_id: 1, name: 'Buy milk', done: 1 },
    { id: 2, project_id: 1, name: 'Buy eggs', done: 0 },
    { id: 3, project_id: 2, name: 'Pick up laundry', done: 0 },
    { id: 4, project_id: 2, name: 'Get car washed', done: 0 }
  ];
  
  // Functions emulating database actions
  
  const insertTodo = (name, projectId) => {
    const newTodo = { id: todos.length + 1, project_id: projectId, name: name, done: 0 };
    todos.push(newTodo);
    return newTodo;
  };
  
  const deleteTodo = (todoId) => {
    const index = todos.findIndex(todo => todo.id == todoId);
    if (index !== -1) {
      todos.splice(index, 1);
      return true;
    }
    return false;
  };
  
  const updateTodoName = (todoId, newName) => {
    const todo = todos.find(todo => todo.id == todoId);
    if (todo) {
      todo.name = newName;
      return todo;
    }
    return null;
  };
  
  const updateTodoDoneStatus = (todoId, doneStatus) => {
    const todo = todos.find(todo => todo.id == todoId);
    if (todo) {
      todo.done = doneStatus;
      return todo;
    }
    return null;
  };
  
  const getTodoById = (todoId) => {
    return todos.find(todo => todo.id == todoId) || null;
  };
  
  const getProjectById = (projectId) => {
    return projects.find(project => project.id == projectId) || null;
  };
  
  const getTodosByProjectId = (projectId) => {
    return todos.filter(todo => todo.project_id == projectId);
  };
  
  const getAllProjects = () => {
    return projects;
  };
  
  // Export functions as a module
  module.exports = {
    insertTodo,
    deleteTodo,
    updateTodoName,
    updateTodoDoneStatus,
    getTodoById,
    getProjectById,
    getTodosByProjectId,
    getAllProjects
  };