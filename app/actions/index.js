// Action Creators
// Should return a type and other properties (payload)

export function addTodo(id, task) {
  return {type: 'ADD_TODO', id, task, completed: false};
}

export function removeTodo(id, task) {
  return {type: 'REMOVE_TODO', id, task};
}

export function toggleTodo(id, task, completed) {
  return {type: 'TOGGLE_TODO', id, task, completed};
}
