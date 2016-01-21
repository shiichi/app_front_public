import React, { PropTypes, Component } from 'react';
import Icon from 'react-fa';
//components
import SidebarMenu from './SidebarMenu';

class MainSidebar extends Component {
  componentDidMount() {
    const { fetchUserInfo } = this.props.actions;
    fetchUserInfo();
  }

  render() {
    const { name, status:{reservations, remainingTickets} } = this.props.myProfile;
    //console.log(this.props.user)
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
            </div>
            <div className="pull-left info">
              <p>{name}</p>
              <a href="#"><Icon spin name="circle" className="text-success"/> Online</a>
            </div>
          </div>
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..."/>
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><Icon name="search"/></button>
              </span>
            </div>
          </form>
          <SidebarMenu/>
        </section>
      </aside>
    );
  }
}

MainSidebar.propTypes = {
  myProfile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSidebar;
