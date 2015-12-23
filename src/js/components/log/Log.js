import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LogActions from '../../actions/log';
// components
import Header from './Header';
import MainSection from './MainSection';

class Log extends Component {
  componentDidMount() {
    const fetchLog = this.props.actions.fetchLog
    fetchLog();
  }

  render() {
    const {log, actions} = this.props;
    console.log(this.props)

    return (
      <div>
        <Header/>
        <MainSection log={log}/>
      </div>
    );
  }
}

Log.propTypes = {
  log: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    log: state.log
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LogActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Log);
