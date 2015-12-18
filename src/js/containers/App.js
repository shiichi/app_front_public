import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Navigation } from '../components';

class App extends Component {
  render() {
    return (
      <div>
        <div className="Sidebar col-md-2">
          <Navigation />
        </div>
        <div className="Content col-md-10">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
