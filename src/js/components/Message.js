import React, { PropTypes, Component } from 'react';

class Message extends Component {
  handleClick(e) {
    const id = Number(e.target.title);
    this.props.deleteMessage(id);
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
  message: PropTypes.object,
  deleteMessage: PropTypes.func.isRequired
};

export default Message;
