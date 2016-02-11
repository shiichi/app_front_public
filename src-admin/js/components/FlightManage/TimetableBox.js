import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import Icon from 'react-fa';
//components
import Date from './Date';
import TimetableColumns from './TimetableColumns';

import RaisedButton from 'material-ui/lib/raised-button';

class TimetableBox extends Component {
  render() {
    const S = {
      timetable: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        marginLeft: 100,
        marginRight: 100,
      },      
      columns: {
        marginLeft: 5,
        marginRight: 5,
        flexBasis: 80,
        flexGrow: 1,
      },      
      button: {
        width: '100%',
        marginBottom: 5,
      },
    }

    return (
      <div style={S.timetable}>
        <div style={S.columns}>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
        </div>
        <div style={S.columns}>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
        </div>
        <div style={S.columns}>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
        </div>
        <div style={S.columns}>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
        </div>
        <div style={S.columns}>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
        </div>
        <div style={S.columns}>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
        </div>
        <div style={S.columns}>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
          <RaisedButton label="Default" style={S.button}/>
        </div>
      </div>
    );
  }
}

TimetableBox.propTypes = {
  timetable: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool,
};

export default TimetableBox;
