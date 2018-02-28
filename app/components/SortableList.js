import React from 'react';

// import connect to connect TodoApp to the
// resources it needs from redux store (which
// is available because the app is wrapped
// by <Provider> in app.js
import {connect} from 'react-redux';

import {toggleTodo} from '../actions/index';
import {removeTodo} from '../actions/index';

import SortableItem from '../components/SortableItem';
import {SortableContainer} from 'react-sortable-hoc';

let SortableList = SortableContainer(({todos, handleToggleTodo, handleRemoveTodo}) => {
  function renderList() {
    return todos.map((todo, index) => (<SortableItem key={`item-${index}`} value={todo} index={index} task={todo.task} completed={todo.completed} id={todo.id}
      handleOnClick={() => handleToggleTodo(todo.id)} handleRemoveClick={() => handleRemoveTodo(todo.id, todo.task)}/>));
  }

  return (<ul className="list-group center">
    {renderList()}
    </ul>);
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleTodo: (id, task, completed) => {
      dispatch(toggleTodo(id, task, completed))
    },
    handleRemoveTodo: (id, task) => {
      dispatch(removeTodo(id, task))
    }
  }
}

// Promote SortableList from a component to a container- it needs to know
// about this new dispatch methods, addTodo, removeTodo, and toggleTodo
// Make them available as props
SortableList = connect(null, mapDispatchToProps)(SortableList);

export default SortableList;
