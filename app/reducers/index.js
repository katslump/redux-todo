import {combineReducers} from 'redux';
import TodosReducer from './todos_reducer';

const rootReducer = combineReducers({
    todos: TodosReducer
});

export default rootReducer;
