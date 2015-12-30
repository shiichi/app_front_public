import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TimetableActions from '../../actions/timetable';
import * as ReservationActions from '../../actions/reservation';
import { getLocal, delLocal } from '../../utils/WebStrageUtils';
//components
import Header from './Header';
import MainSection from './MainSection';
import ConnectionTest from './ConnectionTest';

class Reserve extends Component {
  componentDidMount() {
    const { fetchDefaultStatus } = this.props.actions;
    fetchDefaultStatus();
  }

  componentWillReceiveProps(nextProps) {
    const { modal } = nextProps;
    const { timetableKey, actions: {modalOff, reserve} } = this.props;

    if (modal) {
      const loadResult = setInterval(function() {
        const token = getLocal('testConnectionResult');
        if (token) {
          modalOff();
          reserve({ token }, timetableKey);
          delLocal('testConnectionResult');
          return clearInterval(loadResult);
        }
      }, [3000, 500]);
    }
  }

  render() {
    const { plans, selector, isFetching, didInvalidate, isOld, data, actions, modal } = this.props;
    return (
      <div>
        <Header/>
        <MainSection
          plans = {plans}
          selector = {selector}
          isFetching = {isFetching}
          didInvalidate = {didInvalidate}
          isOld = {isOld}
          data = {data}
          actions = {actions} />
        {modal && <ConnectionTest/>}
      </div>
    );
  }
}

Reserve.propTypes = {
  plans: PropTypes.object.isRequired,
  selector: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool,
  isOld: PropTypes.bool,
  data: PropTypes.object,
  timetableKey: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  rsvActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { timetables, selector, modal } = state;
  const { flightTypes, places, week } = selector;
  const f = flightTypes.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y));
  const p = places.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y));
  const timetableKey = f + '_' + p + '_' + week;
  const {isFetching, didInvalidate, isOld, lastUpdated, data} = timetables[timetableKey] || {isFetching: true};

  return {
    plans: timetables.plans,
    selector,
    data,
    timetableKey,
    isFetching,
    didInvalidate,
    isOld,
    lastUpdated,
    modal
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(TimetableActions, ReservationActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reserve);
