import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import Icon from 'react-fa';
//components

class MessageInTable extends Component {
  render() {
    return (
      <tbody>
        <tr><td>
          <h3><Icon name="warning" className="text-red"/>err</h3>
        </td></tr>
      </tbody>
    );
  }
}

export default MessageInTable;
