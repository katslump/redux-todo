import React from 'react';
import axios from 'axios';

import {getStatus} from '../actions/index';
const dbUrl = "/db";
import {SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({task, id, completed, handleOnClick, handleRemoveClick}) => {
      let handleDeleteClick = (e) => {
        axios.post(dbUrl + '/remove', {
          id: id
        }).then(function(response) {
          handleRemoveClick();
        }).catch(function(error) {
          console.log(error);
        });
      };

      return (<li className="list-group-item" key={id} style={completed
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
            <button type="button" className="close" onClick={handleDeleteClick}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </li>);
  });

    export default SortableItem;
