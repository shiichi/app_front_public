import React, { PropTypes, Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TicketActions from '../../actions/ticket';
import Header from './Header';
import MainSection from './MainSection';

class Ticket extends Component {
  render() {
    const { ticketPanel, actions} = this.props;

    return (
      <div>
        <Header/>
        <MainSection
          ticketPanel={ticketPanel}
          actions={actions}/>
      </div>
    );
  }
}

Ticket.propTypes = {
  message: PropTypes.object.isRequired,
  ticketPanel: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { message, ticketPanel} = state;
  return {
    message,
    ticketPanel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TicketActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Ticket);
