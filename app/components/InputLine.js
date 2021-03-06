import React from 'react';
import {addTodo} from '../actions/index';
import axios from 'axios';
const dbUrl ="/db";


let InputLine = ({status, addTodo}) => {
let input;

  let handleSubmit = (e) => {
    e.preventDefault();
    if(input.value.length > 0) {
      axios.post(dbUrl + '/add', {
        task: input.value,
        completed: false,
        status: status
      }).then(function(response) {
        addTodo({
          task: response.data.task,
          id: response.data._id,
          status: response.data.status
        });
      }).catch(function(error) {
        console.log(error);
      });

      input.value = '';
    }
  }

    return (
    <form onSubmit={handleSubmit}>
      <div className="input-container form-group">
        <input type="text" id="input-username" className="login-input" placeholder={'What needs to be done?'} ref={ text => input = text}/>
      </div>
    </form>
  )

}

export default InputLine;
