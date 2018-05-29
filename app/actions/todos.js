import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const addTodo = todo => (
  {
    type: ADD_TODO,
    todo
  }
);

export const removeTodo = id => (
  {
    type: REMOVE_TODO,
    id
  }
);

export const toggleTodo = id => (
  {
    type: TOGGLE_TODO,
    id
  }
);

export const handleAddTodo = (name, cb) => dispatch => {
  return API.saveTodo(name)
    .then((todo) => {
      dispatch(addTodo(todo));
      cb();
    })
    .catch(() => window.alert('There was an error. Try again.'));
};

export const handleRemoveTodo = (todo) => dispatch => {
  dispatch(removeTodo(todo.id));
  return API.deleteTodo(todo.id)
    .catch(() => {
      dispatch(addTodo(todo));
      window.alert('An error occurred. Try again.');
    });
};

export const handleToggleTodo = (id) => dispatch => {
  return API.saveTodoToggle(id).then(() => {
    dispatch(toggleTodo(id));
  })
    .catch(() => {
      console.log('error');
      // dispatch(toggleTodo(id));
      // window.alert('An error occurred. Try again.');
    });
};
