import React, { PropTypes, Component } from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

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
      <div className="page-nation clearfix" onClick={this.handleClicked.bind(this)}>
        <FontIcon className="material-icons" style={iconStyles} color={Colors.blue500}>videogame_asset</FontIcon>
        <FontIcon className="material-icons" style={iconStyles} color={Colors.blue500}>videogame_asset</FontIcon>
      </div>
    );
  }
}

SelectDate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchTimetableIfNeeded: PropTypes.func.isRequired
};

export default SelectDate;
