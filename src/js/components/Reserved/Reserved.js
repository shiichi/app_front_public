import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReservationActions from '../../actions/reservation';
import Message from '../Message';
import Header from './Header';
import MainSection from './MainSection';

class Reserve extends Component {
  componentDidMount() {
    const { getDefaultRsv } = this.props.rsvActions;
    getDefaultRsv();
  }

  render() {
    const { message, reservation, rsvActions } = this.props;
    return (
      <div>
        <Message
          message = {message}
          deleteMessage = {this.props.rsvActions.deleteMessage}/>
        <Header/>
        <MainSection
          reservation = {reservation}
          cancel = {rsvActions.cancel} />
      </div>
    );
  }
}

Reserve.propTypes = {
  message: PropTypes.object.isRequired,
  reservation: PropTypes.bool.isRequired,
  rsvActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { message, reservation} = state;
  return {
    message,
    reservation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rsvActions: bindActionCreators(ReservationActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Reserve);
