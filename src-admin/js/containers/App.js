import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//actions
import * as UserinfoActions from '../actions/userinfo';
//components
import MainHeader from '../components/MainHeader/MainHeader';
import MainSidebar from '../components/MainSidebar/MainSidebar';

class App extends Component {
  render() {
    const { user, actions } = this.props;
    return (
      <div id="dashboard-container">
        <div className="wrapper">
          <MainHeader/>
          <MainSidebar
            user={user}
            actions={actions}/>
          <div className="content-wrapper" style={{minHeight: '916px'}}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserinfoActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(App);
