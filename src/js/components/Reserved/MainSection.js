import React, { PropTypes, Component } from 'react';
import Panel from './Panel';

class MainSection extends Component {
  render() {
    const { reservation, cancel } = this.props;
    console.log(reservation);

      const renderPanel = reservation.map(r =>
        <Panel status={r} cancel={cancel} />
      );

    return (
      <div>
        { renderPanel }
      </div>
    );
  }
}

export default MainSection;