import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from '../actions/todos';
import { RECEIVE_DATA } from '../actions/shared';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete })
      );
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
};
