import React from 'react';

const Todo = ({task, completed, handleOnClick, handleRemoveClick}) => {
    return (
      <li className="list-group-item" style={completed
          ? {
            'textDecoration': 'line-through'
          }
          : {
            color: 'black'
          }}>
        <span className="col-xs-9 col-md-9" onClick={handleOnClick}>
          {task}
        </span>
        <div className="col-xs-3 col-md-3"><button type="button" className="close" onClick={handleRemoveClick}><span aria-hidden="true">&times;</span></button></div>
      </li>
    );
}

export default Todo;
