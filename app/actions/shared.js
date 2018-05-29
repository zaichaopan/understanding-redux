import API from 'goals-todos-api';

export const RECEIVE_DATA = 'RECEIVE_DATA';

// actions may have two types: sync and async
// action create an action object which contains two parts: type and payload
// it will be used by reducer. Reducer will check the action type to
// determine what to do with the payload

const receiveData = (todos, goals) => {
  return {
    type: RECEIVE_DATA,
    todos,
    goals
  };
};

export default () => dispatch => {
  return Promise.all([
    API.fetchTodos(),
    API.fetchGoals()
  ]).then(([todos, goals]) => {
    dispatch(receiveData(todos, goals));
  });
};
