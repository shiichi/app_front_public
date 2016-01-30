import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//actions
import * as MyProfileActions from '../actions/myProfile';
import * as PageStatusActions from '../actions/pageStatus';
import * as InitializeActions from '../actions/initialize';
//components
import MainHeader from '../components/MainHeader/MainHeader';
import MainSidebar from '../components/MainSidebar/MainSidebar';
import ContentHeader from '../components/Common/ContentHeader';
import Alert from '../components/Common/Alert';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    if (props.sidebar) {
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
    if (nextProps.sidebar) {
      this.state = {
        sidebar: "hold-transition skin-black sidebar-min"
      };
    } else {
      this.state = {
        sidebar: "hold-transition skin-black sidebar-collapse"
      };
    };
  }

  componentDidMount() {
    const { fetchMyProfile } = this.props.actions;
    fetchMyProfile();
  }

  render() {
    const { lang, myProfile, alert, routing, children, actions: {
      changeSidebar, deleteAccessAlerts}
    } = this.props;

    return (
      <div className={this.state.sidebar}>
        <div id="dashboard-container">
          <div className="wrapper">
            <MainHeader changeSidebar={changeSidebar}/>
            <MainSidebar myProfile={myProfile}/>
            <div className="content-wrapper" style={{ minHeight: '916px' }}>
              <ContentHeader routing={routing}/>
              <section className="content">
                <Alert
                  lang={lang}
                  alert={alert}
                  path={routing.path}
                  deleteAccessAlerts={deleteAccessAlerts}/>
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
  lang: PropTypes.string.isRequired,
  myProfile: PropTypes.object.isRequired,
  sidebar: PropTypes.bool.isRequired,
  alert: PropTypes.object,
  routing: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    lang: state.pageStatus.lang,
    myProfile: state.myProfile,
    sidebar: state.pageStatus.sidebar,
    alert: state.alert,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(MyProfileActions, PageStatusActions, InitializeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(App);
