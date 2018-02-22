// Action Creators
// Should return a type and other properties (payload)

export function addTodo(task, id) {
  return {type: 'ADD_TODO', id, task, completed: false, status: "todo"};
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
