import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  }
  return next(action);
};

export default createStore(reducers, applyMiddleware(thunk));

// Dispatch is synchronous; for async, we need to dispatch an action in the then or catch block like dispatch
// receive date after fetching data from server. So what we want the redux to do is if we pass an an action,
// You just need to dispatch it. If we pass you a function, you execute this function but pass me the dispatch
// because we need to dispatch it inside the function when we receive data from server.
// After we define the chunk, we need to define an action which is a function to perform ajax call and after we
// finish the ajax call, we dispatch the action
