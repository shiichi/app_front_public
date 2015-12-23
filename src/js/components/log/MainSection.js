import React, { PropTypes, Component } from 'react';
import { Table } from 'react-bootstrap';

class MainSection extends Component {
  renderLog() {
    const { log } = this.props;
    return log.map((l, i) =>
      <tr key={i}>
        <th>{l.action}枚消費</th>
        <td>{l.method}</td>
        <td>{l.created_at}</td>
      </tr>
    );
  }

  render() {
    return (
      <Table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>追加枚数</th>
            <th>手段</th>
            <th>使用日</th>
          </tr>
        </thead>
        <tbody>
          {this.renderLog()}
        </tbody>
      </Table>
    );
  }
}

MainSection.propTypes = {
  log: PropTypes.array.isRequired
};

export default MainSection;
