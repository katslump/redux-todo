import React from 'react';
import { connect } from 'react-redux';

import Todo from '../components/Todo';

class TodoList extends React.Component {
    renderList() {
        return this.props.todos.map((todo, index) => (
          <Todo
            key={todo.id}
            task={todo.task}
            completed={todo.completed}
            toggleTodo={() => this.props.toggleTodo(index)}
          />
      ));
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
            {this.renderList()}
      </ul>
    )
  }
}

// When state changes, container will re-render
function mapStateToProps(state) {
    // Whatever is returned will show up as props inside TodoList
    return {
        todos: state.todos
    };
}


export default connect(mapStateToProps)(TodoList);
