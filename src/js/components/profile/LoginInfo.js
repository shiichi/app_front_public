import React, { PropTypes, Component } from 'react';
import { Table } from 'react-bootstrap';

class LoginInfo extends Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    //const { ticketPanel } = this.props;
    //const { setTicket, initTicket } = this.props.actions;

    return (
      <Table condensed hover>
        <tbody>
        <tr>
          <th>メールアドレス</th>
          <td>aaa</td>
          <td><a href="" className="btn btn-default">変更</a></td>
        </tr>
        <tr>
          <th>パスワード</th>
          <td>**********</td>
          <td><a href="" className="btn btn-default">変更</a></td>
        </tr>
        </tbody>
      </Table>
    );
  }
}

LoginInfo.propTypes = {
  ticketPanel: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

export default LoginInfo;
