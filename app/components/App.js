import React, { Component } from 'react';
import TodoList from './TodoList';
import PropTypes from 'prop-types';
import handleInitialData from '../actions/shared';
import { connect } from 'react-redux';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  handleInitialData: PropTypes.func.isRequired
};

class App extends Component {
  componentDidMount () {
    this.props.handleInitialData();
  }

  render () {
    return (
      <div>
        {
          this.props.loading
            ? (<h1>Loading</h1>)
            : (<TodoList />)
        }
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = ({ loading }) => ({ loading }); // destruct loading from state
const mapDispatchToProps = { handleInitialData };

export default connect(mapStateToProps, mapDispatchToProps)(App);

// use mapState to map a store state to prop of a component
// use mapDispatch  to map an action to prop of a component
