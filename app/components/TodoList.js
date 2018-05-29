import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { handleAddTodo, handleToggleTodo, handleRemoveTodo } from '../actions/todos';

const propTypes = {
  todos: PropTypes.array.isRequired,
  store: PropTypes.object.isRequired
};

export default class TodoList extends Component {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }

  addTodo () {
    let input = this.inputRef.current;
    this.props.store.dispatch(handleAddTodo(
      input.value, () => { this.inputRef.current.value = ''; }
    ));
  }

  removeTodo (id) {
    this.props.store.dispatch(handleRemoveTodo(id));
  }

  toggleTodo (id) {
    this.props.store.dispatch(handleToggleTodo(id));
  }

  render () {
    const list = this.props.todos.map((todo, index) => (
      <li
        key={index}
        id={todo.id}
      >
        <span onClick={e => this.toggleTodo(todo.id)}
          style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>{todo.name}</span>
        <button type="button" onClick={(e) => this.removeTodo(todo.id)}>X</button>
      </li>));

    return (
      <div>
        <h1>Add todo:</h1>
        <input
          type="text"
          name="todo"
          ref={this.inputRef} />
        <button
          type="button"
          onClick={e => this.addTodo()}>Add todo</button>
        <br />
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = propTypes;
