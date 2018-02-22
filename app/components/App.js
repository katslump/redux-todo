import React from 'react';

import TodoApp from '../containers/TodoApp';
import {connect} from 'react-redux';

import {getStatus} from '../actions/index';


let App = ({status, determineStatus}) => {
  determineStatus('today')
  return (<div className="row">
    <div className="col-xs-12 col-md-4">
      <h4>Today</h4>
      <TodoApp status="today"/>
    </div>
    <div className="col-xs-12 col-md-4">
      <h4>Tomorrow</h4>
      <TodoApp status="tomorrow"/>
    </div>
    <div className="col-xs-12 col-md-4">
      <h4>Done</h4>
      <TodoApp status="done"/>
    </div>
  </div>);

  }

  // When state changes, container will re-render
  const mapStateToProps = (state) => {
    // Whatever is returned will show up as props inside TodoList
    return {status: state.status};
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      determineStatus: (status) => {
        dispatch(getStatus(status))
      }
    }
  }

  // Promote TodoApp from a component to a container- it needs to know
  // about this new dispatch methods, addTodo, removeTodo, and toggleTodo
  // Make them available as props
  App = connect(mapStateToProps, mapDispatchToProps)(App);

  export default App;
