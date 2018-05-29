import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { handleAddTodo, handleToggleTodo, handleRemoveTodo } from '../actions/todos';
import { connect } from 'react-redux';

const propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired
};

class TodoList extends Component {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }

  addTodo () {
    let input = this.inputRef.current;
    this.props.handleAddTodo(input.value, () => { this.inputRef.current.value = ''; });
  }

  removeTodo (id) {
    this.props.handleRemoveTodo(id);
  }

  toggleTodo (id) {
    this.props.handleToggleTodo(id);
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

const mapDispatchToProps = {
  handleAddTodo,
  handleRemoveTodo,
  handleToggleTodo
};

const mapStateToProps = ({ todos }) => ({ todos });

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
