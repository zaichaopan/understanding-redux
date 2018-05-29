import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import TodoList from './components/TodoList';
import PropTypes from 'prop-types';
import handleInitialData from './actions/shared';

const propTypes = { store: PropTypes.object.isRequired };

class App extends Component {
  componentDidMount () {
    let { store } = this.props;
    store.dispatch(handleInitialData());
    store.subscribe(() => this.forceUpdate());
  }

  render () {
    const { store } = this.props;
    const { todos, loading } = store.getState();

    return (
      <div>
        {
          loading
            ? (<h1>Loading</h1>)
            : (<TodoList todos={todos} store={store} />)
        }
      </div>
    );
  }
}

App.propTypes = propTypes;

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
);
