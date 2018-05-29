import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addTodo, removeTodo, toggleTodo } from '../actions/todos';
import { generateId } from '../utils/helpers';

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
    let name = input.value;
    input.value = '';
    this.props.store.dispatch(addTodo({
      name,
      id: generateId(),
      complete: false
    }));
  }

  removeTodo (id) {
    this.props.store.dispatch(removeTodo(id));
  }

  toggleTodo (id) {
    this.props.store.dispatch(toggleTodo(id));
  }

  render () {
    const list = this.props.todos.map(todo => (
      <li
        key={todo.id}
        onClick={e => this.toggleTodo(todo.id)}
        style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}
      >
        {todo.name}
        <button onClick={(e) => this.removeTodo(todo.id)}>X</button>
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
