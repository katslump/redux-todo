import React from 'react';
import axios from 'axios';

import InputLine from '../components/InputLine';
import SortableList from '../components/SortableList';
import {arrayMove} from 'react-sortable-hoc';

// import connect to connect SortableContainer to the
// resources it needs from redux store (which
// is available because the app is wrapped
// by <Provider> in app.js
import {connect} from 'react-redux';
// import the action creator for dispatch usage
import {addTodo} from '../actions/index';
import {setTodos} from '../actions/index';

const dbUrl = "/db";

// have to change to let from const because overwriting below
// with connected SortableContainer
class SortableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentWillMount() {
    let self = this;
    axios.get(dbUrl + '/all').then(function(response) {
      self.setState({items: response.data.todos});
      self.props.fetchTodos(response.data.todos);
    }).catch(function(error) {
      console.log(error);
    });
  }

  onSortEnd({oldIndex, newIndex}) {
    this.props.fetchTodos(arrayMove(this.state.items, oldIndex, newIndex));
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
  }, (result) => {
      this.state.items.forEach(function(val, key) {
          console.log(val);
      });
  });
  }

  render() {
    return (<div>
      <InputLine status={this.props.status} addTodo={(obj) => this.props.addTodoClick(obj)}/>
      <SortableList items={this.state.items} onSortEnd={this.onSortEnd.bind(this)} setTodos={() => this.props.fetchTodos()} todos={this.props.todos.filter(todo => todo.status === this.props.status)} handleToggleTodo={(id) => this.props.toggleTodoClick(id)}/>
    </div>);
  }

}

const mapStateToProps = (state) => {
  return {todos: state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoClick: ({task, id, status}) => {
      dispatch(addTodo(task, id, status))
    },
    fetchTodos: (todos) => {
      dispatch(setTodos(todos))
    }
  }
}

// Promote SortableComponent from a component to a container- it needs to know
// about this new dispatch methods, addTodo, removeTodo, and toggleTodo
// Make them available as props
SortableComponent = connect(mapStateToProps, mapDispatchToProps)(SortableComponent);

export default SortableComponent;
