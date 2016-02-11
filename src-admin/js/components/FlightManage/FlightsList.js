import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import * as TimetableActions from '../../actions/Flight/timetable';
// Material-UI-components
import {
  FlatButton, RaisedButton, Checkbox, AutoComplete, MenuItem, Paper,
  GridList, GridTile, Dialog, FloatingActionButton
} from 'material-ui';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FontIcon from 'material-ui/lib/font-icon';
//Components
import EditTimetable from './EditTimetable';


class FlightsList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      status: {
        '1_1': { active: true, open: 17, reserved: 3, img: '/img/gymnasium.jpg' },
        '1_2': { active: true, open: 17, reserved: 3, img: '/img/country.jpg' },
        '1_3': { active: true, open: 17, reserved: 3, img: '/img/morikoro.jpg' },
        '1_4': { active: false, open: 17, reserved: 3, img: '/img/river.jpg' },          
        '2_1': { active: false, open: 17, reserved: 3, img: '/img/river.jpg' },         
        '2_2': { active: false, open: 17, reserved: 3, img: '/img/river.jpg' },         
        '2_3': { active: false, open: 17, reserved: 3, img: '/img/river.jpg' },         
        '2_4': { active: false, open: 17, reserved: 3, img: '/img/river.jpg' },         
        '3_1': { active: false, open: 17, reserved: 3, img: '/img/river.jpg' },         
        '3_2': { active: false, open: 17, reserved: 3, img: '/img/river.jpg' },         
        '3_3': { active: false, open: 17, reserved: 3, img: '/img/river.jpg' },         
        '3_4': { active: false, open: 17, reserved: 3, img: '/img/river.jpg' },         
      },
      open: false
    };
  }

  hundleClick(e) {
    //this.setState{ tilesData: object.assign({}, this.state.tilesData, )}
    console.log(e.target);
  }

  handleOpen(key) {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const { fetchTimetable } = this.props.actions;
    const { status } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose.bind(this)}/>
    ];

    return (
      <Paper style={this.styles().paper} zDepth={1}>
        <div style={this.styles().root}>
          <GridList
            cellHeight={180}
            style={this.styles().gridList}
            padding={15}
            cols="4">
            {Object.keys(status).map(key => (
              <GridTile
                key={key}
                style={{position: 'relative'}}
                title={status[key].active ?
                  <p>
                    <span style={{fontSize: '1.5rem', marginRight: '.5rem'}}>開講数</span>
                    <span style={{fontSize: '2rem', marginRight: '2rem'}}>{status[key].open}</span>
                    <span style={{fontSize: '1.5rem', marginRight: '.5rem'}}>予約数</span>
                    <span style={{fontSize: '2rem', marginRight: '.5rem'}}>{status[key].reserved}</span>
                  </p> : ""}
              >
                <img
                  src={status[key].img}
                  style={Object.assign({}, this.styles().img, status[key].active ? {} : { opacity: 0.3 })}
                  onClick={this.handleOpen.bind(this, key)}/>
                {!status[key].active &&
                <FloatingActionButton
                  onClick={this.hundleClick.bind(this)}
                  secondary={true}
                  style={this.styles().button}>
                  <ContentAdd />
                </FloatingActionButton>}
              </GridTile>
            ))}
          </GridList>
        </div>
        <div>
          <Dialog
            title="開講状況の変更"
            actions={actions}
            modal={true}
            open={this.state.open}
            contentStyle={this.styles().customContentStyle}
            bodyStyle={this.styles().dialog}>
            <EditTimetable
              data={null}
              isFetching={true}
              didInvalidate={false}
              fetchTimetable={fetchTimetable}/>
          </Dialog>
        </div>
      </Paper>
    );
  }

  styles() {
    return {
      paper: {
        height: 700,
        width: '95%',
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
      },

      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },

      gridList: {
        width: 800,
        height: 600,
        overflowY: 'auto',
        marginTop: 24,
        marginBottom: 24,
      },

      button: {
        position: 'absolute',
        top: 60,
        left: 62,
      },

      img: {
        width: 'auto',
        height: '100%',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      },

      customContentStyle: {
        width: '90%',
        height: '90%',
        maxWidth: 'none',
      },

      dialog: {
        overflow: 'scroll',
        height: 400,
        //maxHeight: 350
      }
    }
  }
}

FlightsList.propTypes = {
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myRoles: state.myProfile.assigneesRoles,
    myPermissions: state.myProfile.assigneesPermissions,
    timetable: state.timetable,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, TimetableActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightsList);
