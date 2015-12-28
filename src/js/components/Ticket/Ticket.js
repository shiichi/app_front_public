import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TicketActions from '../../actions/ticket';
//components
import Header from './Header';
import MainSection from './MainSection';

class Ticket extends Component {
  render() {
    const { ticketPanel, actions } = this.props;

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
  ticketPanel: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { ticketPanel} = state;
  return {
    ticketPanel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TicketActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Ticket);
