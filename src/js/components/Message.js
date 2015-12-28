import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as messageActions from '../actions/message';

class Message extends Component {
   componentWillReceiveProps(nextProps) {
     const { message, actions: {deleteMessage} } = this.props;

     if (nextProps.message.length > message.length) {
       const id = nextProps.message.reduce((maxId, msg) => Math.max(msg.id, maxId), -1);
       setTimeout(function() { deleteMessage(id); }, 5000);
     }
   }

  handleClick(e) {
    const id = Number(e.target.title);
    this.props.actions.deleteMessage(id);
  }

  render() {
    const { message } = this.props;
    const renderMessage = [];
    if (message) {
      for (let m of message) {
        if (m.type === 'success') {
          renderMessage.push(
            <div className="custom-alert alert-success" key={m.id}>
              <p className="alert-title">{m.msg}</p>
              <p className="alert-detail">{m.id}</p>
              <span className="btn-close" title={m.id} onClick={this.handleClick.bind(this)}>×</span>
            </div>
          );
        } else if (m.type === 'error') {
          renderMessage.push(
            <div className="custom-alert alert-danger" key={m.id}>
              <p className="alert-title">{m.msg}</p>
              <p className="alert-detail">{m.id}</p>
              <span className="btn-close" title={m.id} onClick={this.handleClick.bind(this)}>×</span>
            </div>
          );
        }
      }
    }

    return (
      <div className="alert-wrap">
        {renderMessage}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.array,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { message } = state;
  return {
    message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messageActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Message);
