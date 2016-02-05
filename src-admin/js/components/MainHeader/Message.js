import React, { Component } from 'react';
//Components

class Message extends Component {
  render() {
    return (
      <li className="dropdown messages-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-envelope-o"></i>
          <span className="label label-success">4</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have 4 messages</li>
          <li>
            <ul className="menu">
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                  </div>
                  <h4>
                    <small><i className="fa fa-clock-o"></i> 5 mins</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
                  </div>
                  <h4>
                    AdminLTE Design Team
                    <small><i className="fa fa-clock-o"></i> 2 hours</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
                  </div>
                  <h4>
                    Developers
                    <small><i className="fa fa-clock-o"></i> Today</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
                  </div>
                  <h4>
                    Sales Department
                    <small><i className="fa fa-clock-o"></i> Yesterday</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
                  </div>
                  <h4>
                    Reviewers
                    <small><i className="fa fa-clock-o"></i> 2 days</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="footer"><a href="#">See All Messages</a></li>
        </ul>
      </li>
    );
  }
}

Message.propTypes = {

};

export default Message;
