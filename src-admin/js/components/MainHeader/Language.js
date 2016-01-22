import React, { PropTypes, Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from 'react-fa';
//components

class Language extends Component {
  render() {
    const { changeSidebar } = this.props;
    return (
      <NavDropdown noCaret title={<Icon name="globe" style={{fontSize: 18}}/>}>
        <MenuItem eventKey="1">Japanese</MenuItem>
        <MenuItem eventKey="1">English</MenuItem>
      </NavDropdown>
    );
  }
}

Language.propTypes = {
  changeLanguage: PropTypes.func.isRequired
};

export default Language;
