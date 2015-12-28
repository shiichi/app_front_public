import React, { PropTypes, Component } from 'react';
import Panel from './Panel';

class MainSection extends Component {
  render() {
    const { reservation, cancel } = this.props;
    const renderPanel = reservation.map((r, i) =>
        <Panel status={r} cancel={cancel} key={i}/>
      );

    return (
      <div>
        { renderPanel }
      </div>
    );
  }
}

MainSection.propTypes = {
  reservation: PropTypes.array.isRequired,
  cancel: PropTypes.func.isRequired
};

export default MainSection;
