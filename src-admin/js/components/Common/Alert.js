import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionMotion, Motion, spring, presets } from 'react-motion';
import { Input } from 'react-bootstrap';
//Utility
import { trans } from '../../utils/TransUtils';

class Alert extends Component {
  componentDidMount() {
    // setInterval(() => {
    //   const { alert: {access}, deleteAccessAlert } = this.props;
    //   const shouldDelete = Object.keys(access).filter(key => key < Date.now() - 3000);
    //   deleteAccessAlert(shouldDelete)
    // }, 5000);
  }

  handleClick(key) {
    const { deleteAccessAlert } = this.props;
    //actionには削除するkeyの配列を渡す
    deleteAccessAlert([key]);
  }

  getDefaultValue() {
    const {access} = this.props.alert;
    return Object.keys(access)
      .reduce((alerts, key) => {
        alerts[key] = {
          height: 0,
          opacity: 1,
          padding: 0,
          marginBottom: 0,
          data: access[key],
        };
        return alerts;
      }, {});
  }

  getEndValue() {
    const {access} = this.props.alert;
    return Object.keys(access)
      .reduce((alerts, key) => {
        alerts[key] = {
          height: spring(50, presets.gentle),
          opacity: spring(1, presets.gentle),
          padding: spring(15, presets.gentle),
          marginBottom: spring(15, presets.gentle),
          data: access[key],
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
      data: this.props.alert.access[key],
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
    const { lang, alert: {access}} = this.props;
    return (
      <div>
      {access &&
      <TransitionMotion
        defaultStyles={this.getDefaultValue.bind(this)}
        styles={this.getEndValue.bind(this)}
        willLeave={this.willLeave.bind(this)}
        willEnter={this.willEnter.bind(this)}>
        {alerts =>
          <div className="alert-wrap">
            {Object.keys(alerts).map((key, i) => {
              const {data: {status, msg}, ...style} = alerts[key];
              return (
                <div className={'callout custom-alert callout-' + status} style={style} key={key}>
                  <p>{trans(lang, msg)}</p>
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
  lang: PropTypes.string.isRequired,
  alert: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  deleteAccessAlert: PropTypes.func.isRequired
};

export default Alert;
