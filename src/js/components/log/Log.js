import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LogActions from '../../actions/log';
//components
import Header from './Header';
import MainSection from './MainSection';

class Log extends Component {
  componentWillMount() {
    this.props.actions.fetchLog();
  }

  render() {
    const { log } = this.props;

    return (
      <div>
        <Header/>
        <MainSection log={log}/>
      </div>
    );
  }
}

Log.propTypes = {
  message: PropTypes.array,
  log: PropTypes.array,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { log} = state;
  return {
    log
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LogActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Log);
