var React = require('react');

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

module.exports = Todo;
