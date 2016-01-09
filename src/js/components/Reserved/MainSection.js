import React, { PropTypes, Component } from 'react';
import Panel from './Panel';

class MainSection extends Component {
  render() {
    const { reservation, cancel, getJwtIfNeeded } = this.props;
    const renderPanel = reservation.data.map((r, i) =>
        <Panel status={r} cancel={cancel} getJwtIfNeeded={getJwtIfNeeded} key={i}/>
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
