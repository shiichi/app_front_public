import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
      <div className="content-wrapper" style={{ minHeight: '916px' }}>
        <section className="content-header">
          <h1>Dashboard</h1>
        </section>
        <section className="content">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">Welcome Admin Istrator!</h3>
              <div className="box-tools pull-right">
                <button className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" /></button>
              </div>
            </div>
            <div className="box-body">
              <p>This is the AdminLTE theme by <a href="https://almsaeedstudio.com/" target="_blank">https://almsaeedstudio.com/</a>. This is a stripped down version with only the necessary styles and scripts to get it running. Download the full version to start adding components to your dashboard.</p>
              <p>All the functionality is for show with the exception of the <strong>User Management</strong> to the left. This boilerplate comes with a fully functional access control library to manage users/roles/permissions.</p>
              <p>Keep in mind it is a work in progress and their may be bugs or other issues I have not come across. I will do my best to fix them as I receive them.</p>
              <p>Hope you enjoy all of the work I have put into this. Please visit the <a href="https://github.com/rappasoft/laravel-5-boilerplate" target="_blank">GitHub</a> page for more information and report any <a href="https://github.com/rappasoft/Laravel-5-Boilerplate/issues" target="_blank">issues here</a>.</p>
              <p>- Anthony Rappa</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {

};

export default Dashboard;
