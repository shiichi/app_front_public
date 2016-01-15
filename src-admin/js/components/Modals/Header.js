import React, { PropTypes, Component } from 'react';
//components

class Header extends Component {
  render() {
    console.log(this);
    return (
      <section class="content-header">
        <h1>
          Modals
          <small>new</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">UI</a></li>
          <li class="active">Modals</li>
        </ol>
      </section>
    );
  }
}

Header.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Header;
