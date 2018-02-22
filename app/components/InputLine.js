import React from 'react';
import {addTodo} from '../actions/index';


let InputLine = ({status, addTodo}) => {
let input;

  let handleSubmit = (e) => {
    e.preventDefault();
    if(input.value.length > 0) {
      addTodo(input.value);
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
