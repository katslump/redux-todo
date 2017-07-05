import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.todos.map((todo, index) => (
            <Todo
              key={todo.id}
              task={todo.task}
              completed={todo.completed}
              toggleTodo={() => this.props.toggleTodo(index)}
            />
          ))
        }
      </ul>
    )
  }
}

export default TodoList;
