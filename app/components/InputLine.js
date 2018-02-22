import React from 'react';
import {addTodo} from '../actions/index';
import axios from 'axios';
const dbUrl = "http://localhost:3000/db";


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
          task: input.value,
          id: response.data["_id"],
          status: status
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
