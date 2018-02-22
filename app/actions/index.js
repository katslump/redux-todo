// Action Creators
// Should return a type and other properties (payload)

export function addTodo(task, id, status) {
  return {type: 'ADD_TODO', id, task, completed: false, status};
}

export function removeTodo(id, task) {
  return {type: 'REMOVE_TODO', id, task};
}

export function toggleTodo(id, task, completed) {
  return {type: 'TOGGLE_TODO', id, task, completed};
}

export function changeStatus(id, task, status) {
  return {type: 'CHANGE_STATUS', id, task, status};
}

export function getStatus(status) {
  return {type: 'GET_STATUS', status};
}

export function setTodos(todos) {
  return {type: 'SET_TODOS', todos};
}
