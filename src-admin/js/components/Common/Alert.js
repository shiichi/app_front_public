import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionMotion, Motion, spring, presets } from 'react-motion';
import { Input } from 'react-bootstrap';
import { defineMessages, FormattedMessage } from 'react-intl';

class Alert extends Component {
  componentDidMount() {
    // setInterval(() => {
    //   const { alert: {access}, deleteAccessAlerts } = this.props;
    //   const shouldDelete = Object.keys(access).filter(key => key < Date.now() - 3000);
    //   deleteAccessAlerts(shouldDelete)
    // }, 5000);
  }

  handleClick(key) {
    const { deleteSideAlerts } = this.props;
    deleteSideAlerts([key]);
  }

  getDefaultValue() {
    const { alert } = this.props;
    return Object.keys(alert)
      .reduce((alerts, key) => {
        alerts[key] = {
          height: 0,
          opacity: 1,
          padding: 0,
          marginBottom: 0,
          data: alert[key],
        };
        return alerts;
      }, {});
  }

  getEndValue() {
    const { alert } = this.props;
    return Object.keys(alert)
      .reduce((alerts, key) => {
        alerts[key] = {
          height: spring(50, presets.gentle),
          opacity: spring(1, presets.gentle),
          padding: spring(15, presets.gentle),
          marginBottom: spring(15, presets.gentle),
          data: alert[key],
        };
        return alerts;
      }, {});
  }

  willEnter(key) {
    return {
      height: 0,
      opacity: 1,
      padding: 0,
      marginBottom: 0,
      data: this.props.alert[key],
    };
  }

  willLeave(key, styleThatJustLeft) {
    return {
      height: spring(0),
      opacity: spring(0),
      padding: spring(0),
      marginBottom: spring(0),
      data: styleThatJustLeft.data,
    };
  }

  render() {
    const { lacale, alert } = this.props;
    return (
      <div>
      {alert &&
      <TransitionMotion
        defaultStyles={this.getDefaultValue.bind(this)}
        styles={this.getEndValue.bind(this)}
        willLeave={this.willLeave.bind(this)}
        willEnter={this.willEnter.bind(this)}>
        {alerts =>
          <div className="alert-wrap">
            {Object.keys(alerts).map((key, i) => {
              const {data: {status, messageId, value}, ...style} = alerts[key];
              return (
                <div className={'callout custom-alert callout-' + status} style={style} key={key}>
                  <FormattedMessage id={messageId} values={value}>
                    {text => <p>{text}</p>}
                  </FormattedMessage>
                  <span className="btn-close" title={key} onClick={this.handleClick.bind(this, key)}>×</span>
                </div>
              );
            })}
          </div>
        }
      </TransitionMotion>}
      </div>
    );
  }
}

Alert.propTypes = {
  lacale: PropTypes.string.isRequired,
  alert: PropTypes.object.isRequired,
  deleteAccessAlerts: PropTypes.func.isRequired
};

export default Alert;
