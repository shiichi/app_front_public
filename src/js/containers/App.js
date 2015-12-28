import React, { Component, PropTypes } from 'react';
//components
import Navigation from '../components/Navigation/Navigation';
import Message from '../components/message';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navigation />
        <Message />
        <div className="content col-md-10">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
