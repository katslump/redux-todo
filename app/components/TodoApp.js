import React from 'react';
import axios from 'axios';

import InputLine from '../components/InputLine';
import TodoList from '../components/TodoList';

// import connect to connect TodoApp to the
// resources it needs from redux store (which
// is available because the app is wrapped
// by <Provider> in app.js
import {connect} from 'react-redux';
// import the action creator for dispatch usage
import {addTodo} from '../actions/index';

const dbUrl = "http://localhost:3000/db";
let id = 0;

// have to change to let from const because overwriting below
// with connected TodoApp
let TodoApp = ({todos, addTodoClick, toggleTodoClick, status}) => {


    let self = this;
    axios.get(dbUrl + '/all').then(function(response) {
      console.log("getting all todos from db:");
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });


  return (<div>
    <InputLine addTodo={(task) => addTodoClick(task, id++, status)}/>
    <TodoList todos={todos.filter(todo => todo.status === status)} handleToggleTodo={(id) => toggleTodoClick(id)}/>
  </div>);

  // Performs AJAX request that gets all todos in the DB
// before component loads on the page.
// Sets todos state on success, errors otherwise


}

// When state changes, container will re-render
const mapStateToProps = (state) => {
  // Whatever is returned will show up as props inside TodoList
  return {todos: state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoClick: (id, task, status) => {
      dispatch(addTodo(id, task, status))
    }
  }
}

// Promote TodoApp from a component to a container- it needs to know
// about this new dispatch methods, addTodo, removeTodo, and toggleTodo
// Make them available as props
TodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

export default TodoApp;
