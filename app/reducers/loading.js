// reducer is used to change state. so here we need to handle in what cases we need to update the loading state
// the name of reducer is the name of the state

import { RECEIVE_DATA } from '../actions/shared';

export default (state = true, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return false;
    default:
      return state;
  }
};
