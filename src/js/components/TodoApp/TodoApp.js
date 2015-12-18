import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions/todos';
import Header from './Header';
import MainSection from './MainSection';

class TodoApp extends Component {
  render() {
    const { todos, actions } = this.props;
    return (
      <div className="col-md-10">
        <div className="todoapp" >
          <Header addTodo={actions.addTodo}/>
          <MainSection todos={todos} actions={actions} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(TodoApp);
