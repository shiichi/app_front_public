import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TimetableActions from '../../actions/timetable';
import * as ReservationActions from '../../actions/reservation';
import { getSession, getLocal } from '../../utils/WebStrageUtils';
//components
import Header from './Header';
import MainSection from './MainSection';
import ConnectionTest from './ConnectionTest';

class Reserve extends Component {
  componentWillMount() {
    const { fetchDefaultStatus } = this.props.actions;
    fetchDefaultStatus();
  }

  componentDidMount() {
    //const { fetchDefaultStatus } = this.props.actions;
    //fetchDefaultStatus();
  }

  componentWillReceiveProps(nextProps) {
    const { modal }  = nextProps;
    const { rsvActions: {modalOff, reserve}, key } = this.props;
    console.log("nextProps",nextProps.data)

    if (modal) {
      const loadResult = setInterval(function() {
        const token = getLocal('testConnectionResult');
        if (token) {
          modalOff();
          const request = {token: token};
          reserve(request, key);
          return clearInterval(loadResult);
        }
      }, [3000, 500]);
    }
  }

  render() {
    const { selector, isFetching, didInvalidate, data, actions, modal } = this.props;
    return (
      <div>
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
  modal: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  rsvActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { timetable, selector, modal} = state;
  const { flightTypes, places, week } = selector;
  const f = flightTypes.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y));
  const p = places.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y));
  const key = f + '_' + p + '_' + week;
  const {isFetching, didInvalidate, lastUpdated, data} = timetable[key] || {isFetching: true};

  return {
    selector,
    isFetching,
    didInvalidate,
    lastUpdated,
    data,
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
