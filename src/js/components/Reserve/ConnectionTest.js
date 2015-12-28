import React, { PropTypes, Component } from 'react';
import { CSRFToken, domainName } from '../../utils/csrfUtils';

class ConnectionTest extends Component {
  render() {
    const { columns } = this.props;
    const src = domainName + '/mypage/test';
    return (
      <div>
        <iframe id='iframe' src={ src } sandbox='allow-same-origin allow-scripts' ></iframe>
        <div id="modal-overlay"></div>
      </div>
    );
  }
}

ConnectionTest.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default ConnectionTest;
