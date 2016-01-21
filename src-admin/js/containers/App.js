import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//actions
import * as UserinfoActions from '../actions/userinfo';
import * as PageStatusActions from '../actions/pageStatus';
//components
import MainHeader from '../components/MainHeader/MainHeader';
import MainSidebar from '../components/MainSidebar/MainSidebar';
import ContentHeader from '../components/Common/ContentHeader';
import Alert from '../components/Common/Alert';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    if (props.pageStatus.sidebar) {
      this.state = {
        sidebar: "hold-transition skin-black sidebar-min"
      };
    } else {
      this.state = {
        sidebar: "hold-transition skin-black sidebar-collapse"
      };
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pageStatus.sidebar) {
      this.state = {
        sidebar: "hold-transition skin-black sidebar-min"
      };
    } else {
      this.state = {
        sidebar: "hold-transition skin-black sidebar-collapse"
      };
    };
  }

  render() {
    const { myProfile, alert, routing, actions, children, actions: {changeSidebar} } = this.props;
    return (
      <div className={this.state.sidebar}>
        <div id="dashboard-container">
          <div className="wrapper">
            <MainHeader changeSidebar={changeSidebar}/>
            <MainSidebar
              myProfile={myProfile}
              actions={actions}/>
            <div className="content-wrapper" style={{ minHeight: '916px' }}>
              <ContentHeader routing={routing}/>
              <section className="content">
                <Alert
                  alert={alert}
                  path={routing.path}/>
                {children}
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  myProfile: PropTypes.object.isRequired,
  pageStatus: PropTypes.object.isRequired,
  alert: PropTypes.object,
  routing: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myProfile: state.myProfile,
    pageStatus: state.pageStatus,
    alert: state.alert,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(UserinfoActions, PageStatusActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(App);
