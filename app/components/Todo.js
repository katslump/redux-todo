import React from 'react';
import {getStatus} from '../actions/index';


const Todo = ({task, id, completed, handleOnClick, handleRemoveClick}) => {
  return (<li className="list-group-item" style={completed
      ? {
        'textDecoration': 'line-through'
      }
      : {
        color: 'black'
      }}>
    <div className="row">
      <div className="col-xs-10 col-md-8" onClick={handleOnClick}>
        {task}
      </div>
      <div className="col-xs-2 col-md-4">
        <button type="button" className="close" onClick={handleRemoveClick}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </li>);
}

export default Todo;
