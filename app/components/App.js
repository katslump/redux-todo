import React from 'react';
import TodoApp from './TodoApp';
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

  const mapStateToProps = (state) => {
    // Whatever is returned will show up as props inside App
    return {status: state.status};
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      determineStatus: (status) => {
        dispatch(getStatus(status))
      }
    }
  }

  // Promote App from a component to a container
  App = connect(mapStateToProps, mapDispatchToProps)(App);

  export default App;
