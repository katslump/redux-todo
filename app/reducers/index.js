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
        completed: action.completed,
        status: action.status
      };
      // okay to mutate our own copy
      addTodoNewState.push(newTodo);
      console.log(newTodo);
      return addTodoNewState;

    case 'REMOVE_TODO':
      // copy new state so no mutations to old state
      const removeTodoNewState = [...state];
      // go through array and remove given task
      let newState = removeTodoNewState.filter(function(todo) {
        return todo.id != action.id
      });
      return newState;

    case 'TOGGLE_TODO':
      // copy new state so no mutations to old state
      const toggleTodoNewState = [...state];
      // go through array and update given task
      let newToggleState = toggleTodoNewState.map((item, index) => {
        if (item.id === action.id) {
          return {
            id: item.id,
            task: item.task,
            completed: !(item.completed),
            status: item.status
          }
        }
        return item;
      });
      return newToggleState;

    case 'CHANGE_STATUS':
      return state;

    case 'SET_TODOS':
      const setTodoNewState = [];

      action.todos.todos.forEach(function(value, key) {
        const newTodo = {
          id: value._id,
          task: value.task,
          completed: value.completed,
          status: value.status
        };
        setTodoNewState.push(newTodo);
      });
      return setTodoNewState;
    default:
      return state;
  }
};

export default reducer;
