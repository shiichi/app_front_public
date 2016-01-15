import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
//components
import Panel from './Panel';

class MainSection extends Component {
  render() {
    const { reservation, cancel, getJwtIfNeeded } = this.props;
    const renderPanel = reservation.data.map((r, i) =>
        <Panel status={r} cancel={cancel} getJwtIfNeeded={getJwtIfNeeded} key={i}/>
      );

    return (
      <div>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        { renderPanel }
      </ReactCSSTransitionGroup>  
      </div>
    );
  }
}

MainSection.propTypes = {
  reservation: PropTypes.object,
  getJwtIfNeeded: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default MainSection;
