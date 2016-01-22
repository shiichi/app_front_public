import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//components

class Language extends Component {
  render() {
    const { changeSidebar } = this.props;
    return (
      <NavDropdown bsStyle="primary" bsSize="small" title="Users">
        <LinkContainer to={{ pathname: '/foo', query: { bar: 'baz' } }}>
          <MenuItem eventKey="1">Japanese</MenuItem>
        </LinkContainer>
        <MenuItem eventKey="2">English</MenuItem>
      </NavDropdown>
    );
  }
}

Language.propTypes = {
  changeLanguage: PropTypes.func.isRequired
};

export default Language;
