import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReservationActions from '../../actions/reservation';
//components
import Header from './Header';
import MainSection from './MainSection';

class Reserve extends Component {
  componentWillMount() {
    this.props.actions.getDefaultRsv();
  }

  render() {
    const { reservation, actions: {cancel} } = this.props;
    return (
      <div>
        <Header/>
        <MainSection
          reservation = {reservation}
          cancel = {cancel} />
      </div>
    );
  }
}

Reserve.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { reservation} = state;
  return {
    reservation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ReservationActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Reserve);
