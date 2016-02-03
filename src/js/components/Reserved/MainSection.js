import React, { PropTypes, Component } from 'react';
import { TransitionMotion, Motion, spring, presets } from 'react-motion';
//components
import Panel from './Panel';

class MainSection extends Component {
  getDefaultValue() {
    const { reservations } = this.props.reservation;
    return Object.keys(reservations).reduce((result, key) => {
      result[key] = {
        opacity: 1,
        data: reservations[key],
      };
      return result;
    }, {});
  }

  getEndValue() {
    const { reservations } = this.props.reservation;
    return Object.keys(reservations).reduce((result, key) => {
      result[key] = {
        opacity: spring(1, presets.gentle),
        data: reservations[key],
      };
      return result;
    }, {});
  }

  willEnter(key) {
    return {
      opacity: 1,
      data: this.props.reservation.reservations[key],
    };
  }

  willLeave(key, styleThatJustLeft) {
    return {
      opacity: spring(0),
      data: styleThatJustLeft.data,
    };
  }

  render() {
    const { reservation: {reservations, isCanceling}, cancel, getJwtIfNeeded } = this.props;

    return (
      <div>
      {reservations &&
      <TransitionMotion
        defaultStyles={this.getDefaultValue.bind(this)}
        styles={this.getEndValue.bind(this)}
        willLeave={this.willLeave.bind(this)}
        willEnter={this.willEnter.bind(this)}>
        {reservations =>
          <div>
          {Object.keys(reservations).map((key) => {
            const { data, ...style } = reservations[key];
            return (
              <Panel
                style={style}
                status={data}
                isCanceling={isCanceling}
                cancel={cancel}
                getJwtIfNeeded={getJwtIfNeeded}
                key={key}/>
            );
          })}
          </div>
        }
      </TransitionMotion>}
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
