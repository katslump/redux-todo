import React from 'react';
import InputLine from './InputLine';
import TodoList from './TodoList';


let id = 0;

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  toggleTodo(index) {
    const newTodo = Object.assign(
      {},
      this.state.todos[index],
      { completed: !this.state.todos[index].completed }
    );
    const newTodos = [ 
      ...this.state.todos.slice(0, index),
      newTodo,
      ...this.state.todos.slice(index + 1)  
    ];
    this.setState({ todos: newTodos });
  }

  addTodo(task) {
    const newTodo = { 
      id: id++,
      task: task,
      completed: false 
    };
    const newTodos = [ ...this.state.todos ]
    newTodos.push(newTodo);
    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <div>
        <InputLine
          addTodo={(task) => this.addTodo(task)}
        />
        <TodoList
          todos={this.state.todos}
          toggleTodo={(index) => this.toggleTodo(index)}
          removeTodo={(index) => this.removeTodo(index)}
        />
      </div>
    );
  }
}

export default TodoApp;
