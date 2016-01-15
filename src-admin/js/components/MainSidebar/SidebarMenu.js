import React, { PropTypes, Component } from 'react';
//components

class SidebarMenu extends Component {
  render() {
    return (
      <ul className="sidebar-menu">
        <li className="header">MAIN NAVIGATION</li>
        <li className="active treeview">
          <a href="#">
            <i className="fa fa-dashboard"></i> <span>Dashboard</span> <i className="fa fa-angle-left pull-right"></i>
          </a>
          <ul className="treeview-menu">
            <li className="active"><a href="index.html"><i className="fa fa-circle-o"></i> Dashboard v1</a></li>
            <li><a href="index2.html"><i className="fa fa-circle-o"></i> Dashboard v2</a></li>
          </ul>
        </li>
        <li className="treeview">
          <a href="#">
            <i className="fa fa-share"></i> <span>Multilevel</span>
            <i className="fa fa-angle-left pull-right"></i>
          </a>
          <ul className="treeview-menu">
            <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
            <li>
              <a href="#"><i className="fa fa-circle-o"></i> Level One <i className="fa fa-angle-left pull-right"></i></a>
              <ul className="treeview-menu">
                <li><a href="#"><i className="fa fa-circle-o"></i> Level Two</a></li>
                <li>
                  <a href="#"><i className="fa fa-circle-o"></i> Level Two <i className="fa fa-angle-left pull-right"></i></a>
                  <ul className="treeview-menu">
                    <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                    <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
          </ul>
        </li>
        <li className="header">LABELS</li>
        <li><a href="#"><i className="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
        <li><a href="#"><i className="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
        <li><a href="#"><i className="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
      </ul>
    );
  }
}

SidebarMenu.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default SidebarMenu;
