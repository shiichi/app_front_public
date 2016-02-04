import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//actions
import * as ApplicationActions from '../actions/application';
import * as MyProfileActions from '../actions/myProfile';
import * as InitializeActions from '../actions/initialize';
//components
import MainHeader from '../components/MainHeader/MainHeader';
import MainSidebar from '../components/MainSidebar/MainSidebar';
import Alert from '../components/Common/Alert';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchMyProfile();
    this.state = { sidebar: 'min' };
  }

  hundleSidebar() {
    if (this.state.sidebar === 'min') {
      this.setState({sidebar: 'collapse'});
    } else {
      this.setState({sidebar: 'min'});
    }
  }

  render() {
    const { locale, myProfile, alert, routing, children, actions: {
      changeLocale, changeSidebar, deleteSideAlerts}
    } = this.props;

    return (
      <div className={`hold-transition skin-black sidebar-${this.state.sidebar}`}>
        <div id="dashboard-container">
          <div className="wrapper">
            <MainHeader
              locale={locale}
              changeLocale={changeLocale}
              hundleSidebar={this.hundleSidebar.bind(this)}/>
            <MainSidebar myProfile={myProfile}/>
            <Alert
              alert={alert}
              deleteSideAlerts={deleteSideAlerts}/>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string.isRequired,
  myProfile: PropTypes.object.isRequired,
  alert: PropTypes.object,
  routing: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    locale: state.application.locale,
    myProfile: state.myProfile,
    alert: state.alert.side,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(
    ApplicationActions,
    MyProfileActions,
    InitializeActions
  );
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(App);
