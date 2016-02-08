import React, { PropTypes, Component } from 'react';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import ActionHome from 'material-ui/lib/svg-icons/action/home';

class SelectDate extends Component {
  handleClicked(e) {
    const { isFetching, fetchTimetableIfNeeded } = this.props;
    const { className } = e.target;

    if (!isFetching) {
      if (className === 'btn-buck') fetchTimetableIfNeeded(null, null, -1);
      if (className === 'btn-next') fetchTimetableIfNeeded(null, null, 1);
    }
  }

  render() {
const iconStyles = {
  marginRight: 24,
};
    return (
      <div style={{height: 500}}>
        <IconButton tooltip="SVG Icon">
          <ActionHome />
        </IconButton>
    <IconButton
      iconClassName="material-icons"
      tooltip="Ligature"
    >
      home
    </IconButton>
      </div>
    );
  }
}

SelectDate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchTimetableIfNeeded: PropTypes.func.isRequired
};

export default SelectDate;
