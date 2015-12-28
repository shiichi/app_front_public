import React, { PropTypes, Component } from 'react';

class SelectDate extends Component {
  handleClicked(e) {
    const { isFetching, handleWeek } = this.props;

    let n;
    switch (e.target.className) {
    case 'btn-buck': n = -1;
      break;
    case 'btn-next': n = 1;
      break;
    default: n = 0;
      break;
    }

    if (!isFetching) {
      handleWeek(n);
    }
  }

  render() {
    return (
      <div className="page-nation clearfix" onClick={this.handleClicked.bind(this)}>
        <div className="btn-buck" id="btn-loop"></div>
        <div className="btn-next"></div>
      </div>
    );
  }
}

SelectDate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  handleWeek: PropTypes.func.isRequired
};

export default SelectDate;
