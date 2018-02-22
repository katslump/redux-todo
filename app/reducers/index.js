// Inside app/reducers/index.js
const reducer = (state = [], action) => {

  switch (action.type) {
    case 'ADD_TODO':
      // copy new state so no mutations to old state
      const addTodoNewState = [...state];
      // create the todo from the action object
      const newTodo = {
        id: action.id,
        task: action.task,
        completed: action.completed
      };
      // okay to mutate our own copy
      addTodoNewState.push(newTodo);
      return addTodoNewState;
    case 'REMOVE_TODO':
    console.log("REMOVE_TODO");

        // copy new state so no mutations to old state
        const removeTodoNewState = [...state];
        // get index of task
        var indexOfTodo = removeTodoNewState.indexOf(action);
        // remove task and return
        removeTodoNewState.splice(indexOfTodo, 1);
      return removeTodoNewState;
    case 'TOGGLE_TODO':
        console.log("TOGGLE_TODO");
        // copy new state so no mutations to old state
        const toggleTodoNewState = [...state];
        // get index of task
        var indexOfTodo = toggleTodoNewState.indexOf(action);
        action.completed = !(action.completed)
        toggleTodoNewState.splice(indexOfTodo, 1, action);
      return toggleTodoNewState;
    default:
      return state;
  }
};

export default reducer;
