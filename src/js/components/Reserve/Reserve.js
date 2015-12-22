import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TimetableActions from '../../actions/timetable';
import * as ReservationActions from '../../actions/reservation';
import { getSession, getLocal } from '../../utils/WebStrageUtils';
import Header from './Header';
import Message from '../Message';
import MainSection from './MainSection';
import ConnectionTest from './ConnectionTest';

class Reserve extends Component {
  componentDidMount() {
    const { fetchDefaultStatus } = this.props.actions;
    fetchDefaultStatus();
  }

  componentWillReceiveProps(nextProps) {
    const { modal } = nextProps;
    const { modalOff, reserve } = this.props.rsvActions;

    if (modal) {
      const loadResult = setInterval(function() {
        const token = getLocal('testConnectionResult');
        if (token) {
          modalOff();
          const request = {token: token};
          reserve(request);
          return clearInterval(loadResult);
        }
      }, [3000, 500]);
    }
  }

  render() {
    const { selector, isFetching, didInvalidate, data, actions, message, modal } = this.props;
    return (
      <div>
        {!modal &&
        <Message
          message={message}
          deleteMessage={this.props.rsvActions.deleteMessage}/>
        }
        <Header/>
        <MainSection
          selector = {selector}
          isFetching = {isFetching}
          didInvalidate = {didInvalidate}
          data = {data}
          actions = {actions}
          validateReservation = {this.props.rsvActions.validateReservation} />
        {modal && <ConnectionTest/>}
      </div>
    );
  }
}

Reserve.propTypes = {
  selector: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  message: PropTypes.array.isRequired,
  modal: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  rsvActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { timetable, selector, message, modal} = state;
  const { flightTypes, places, week } = selector;
  const f = flightTypes.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y));
  const p = places.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y));
  const key = f + '_' + p + '_' + week;
  const {isFetching, lastUpdated, data} = timetable[key] || {isFetching: true};

  return {
    selector,
    isFetching,
    lastUpdated,
    data,
    message,
    modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TimetableActions, dispatch),
    rsvActions: bindActionCreators(ReservationActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Reserve);
