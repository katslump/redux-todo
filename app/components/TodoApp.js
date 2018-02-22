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
import {setTodos} from '../actions/index';

const dbUrl = "/db";

// have to change to let from const because overwriting below
// with connected TodoApp
class TodoApp extends React.Component{

componentWillMount() {
  let self = this;
    axios.get(dbUrl + '/all').then(function(response) {
      self.props.fetchTodos(response.data);
    }).catch(function(error) {
      console.log(error);
    });
}

render(){
  return (<div>
    <InputLine status={this.props.status} addTodo={() => this.props.addTodoClick()}/>
    <TodoList setTodos={() => this.props.fetchTodos()} todos={this.props.todos.filter(todo => todo.status === this.props.status)} handleToggleTodo={(id) => this.props.toggleTodoClick(id)}/>
  </div>);
}

}

// When state changes, container will re-render
const mapStateToProps = (state) => {
  // Whatever is returned will show up as props inside TodoList
  return {todos: state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoClick: (task, id, status) => {
      dispatch(addTodo(task, id, status))
    },
    fetchTodos: (todos) => {
      dispatch(setTodos(todos))
    }
  }

}

// Promote TodoApp from a component to a container- it needs to know
// about this new dispatch methods, addTodo, removeTodo, and toggleTodo
// Make them available as props
TodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

export default TodoApp;
