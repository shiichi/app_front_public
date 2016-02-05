import React, { PropTypes, Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import Icon from 'react-fa';

class International extends Component {
  handleClick(event, key) {
    const { changeLocale } = this.props;
    changeLocale(key);
  }

  render() {
    return (
      <NavDropdown
        noCaret
        title={<Icon name="globe" style={{ fontSize: 18 }}/>}
        onSelect={this.handleClick.bind(this)}>
        <MenuItem eventKey="ja">Japanese</MenuItem>
        <MenuItem eventKey="en">English</MenuItem>
      </NavDropdown>
    );
  }
}

International.propTypes = {
  locale: PropTypes.string.isRequired,
  changeLocale: PropTypes.func.isRequired
};

export default International;
