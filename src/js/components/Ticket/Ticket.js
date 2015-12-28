import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TicketActions from '../../actions/ticket';
//components
import Header from './Header';
import MainSection from './MainSection';

class Ticket extends Component {
  render() {
    const { actions } = this.props;

    return (
      <div>
        <Header/>
        <MainSection
          actions={actions}/>
      </div>
    );
  }
}

Ticket.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TicketActions, dispatch)
  };
}

export default connect(mapDispatchToProps)(Ticket);
