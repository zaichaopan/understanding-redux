import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import TodoList from './components/TodoList';
import PropTypes from 'prop-types';

const propTypes = { store: PropTypes.object.isRequired };

class App extends Component {
  componentDidMount () {
    let { store } = this.props;
    store.subscribe(() => this.forceUpdate());
  }

  render () {
    const { store } = this.props;
    const { todos } = store.getState();

    return (
      <TodoList todos={todos} store={store} />
    );
  }
}

App.propTypes = propTypes;

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
);
