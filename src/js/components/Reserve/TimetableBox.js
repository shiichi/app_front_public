import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import Icon from 'react-fa';
import Date from './Date';
import TimetableColumns from './TimetableColumns';

class TimetableBox extends Component {

  validateReservation(request) {
    this.props.validateReservation(request);
  }

  handleClick() {
    const { fetchTimetableAgain } = this.props;
    fetchTimetableAgain();
  }

  renderDate() {
    const { date } = this.props.data;
    return date.map((d, i) =>
      <Date className={d.c} dateNodes={d.d} key={i} />
    );
  }

  renderTimetableColumns() {
    const { timetable } = this.props.data;
    return timetable.map((t, i) =>
      <TimetableColumns columns={t} key={i} validateReservation={this.validateReservation.bind(this)}/>
    );
  }

  renderContent(requestIs) {
    switch (requestIs) {
    case 'success':
      return (
        <div>
          <ul className="date-warp">
            { this.renderDate() }
          </ul>
          <div className="timetable">
            { this.renderTimetableColumns() }
          </div>
        </div>
      );
    case 'loading':
      return (
        <div className="loading">
          <Icon spin name="spinner" />
        </div>
      );
    case 'fail':
      return (
        <div className="error">
          <p className="aaa">予約状況の取得に失敗しました、もう一度実行してください</p>
          <Button onClick={this.handleClick.bind(this)} >再読み込み</Button>
        </div>
      );
    default:
      return (
        <Icon spin name="spinner" />
      );
    }
  }

  render() {
    const { isFetching, didInvalidate} = this.props;
    let requestIs;

    if (!isFetching && !didInvalidate) requestIs = 'success';
    else if (isFetching && !didInvalidate) requestIs = 'loading';
    else if (!isFetching && didInvalidate) requestIs = 'fail';

    const content = this.renderContent(requestIs);
    return (
      <div>
        {content}
      </div>
    );
  }
}

TimetableBox.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  data: PropTypes.object,
  fetchTimetableAgain: PropTypes.func
};

export default TimetableBox;
