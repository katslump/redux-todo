import React from 'react';

class Todo extends React.Component {
  render() {
    return (
      <li>
        <span onClick={() => this.props.toggleTodo()}>
          {this.props.completed ? <strike> {this.props.task}</strike> : this.props.task}
        </span>
      </li>
    );
  }
}

export default Todo;
