import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import injectTapEventPlugin from 'react-tap-event-plugin';
//Material-UI-components
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';

//Actions
import { routeActions } from 'react-router-redux';
import * as TimetableActions from '../../actions/Flight/timetable';
//Components
import EditTimetable from './EditTimetable';


class ReactAbsolute extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      status: {
        1: {
          active: true,
          img: '/img/gymnasium.jpg',
          open: 17,
          reserved: 3,
        },

        2: {
          active: true,
          img: '/img/country.jpg',
          open: 17,
          reserved: 3,
        },

        3: {
          active: true,
          img: '/img/morikoro.jpg',
          open: 17,
          reserved: 3,
        },

        4: {
          active: false,
          img: '/img/river.jpg',
          imgStyle: { opacity: 0.3 },
          open: 17,
          reserved: 3,
        },
      },
      open: false
    };
  }

  hundleClick(e) {
    //this.setState{ tilesData: object.assign({}, this.state.tilesData, )}
    console.log(e.target);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const { status } = this.state;
    console.log(this.state)
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose.bind(this)}
      />,
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
                  </p> : ""}>
                <img src={status[key].img} style={Object.assign({}, this.styles().img, status[key].imgStyle)}/>
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
          <RaisedButton label="Modal Dialog" onClick={this.handleOpen.bind(this)} />
          <Dialog
            title="開講状況の変更"
            actions={actions}
            modal={true}
            open={this.state.open}>
            <EditTimetable
              data={null}
              isFetching={true}
              didInvalidate={false}
              fetchTimetable={false}/>
          </Dialog>
        </div>
      </Paper>
    );
  }

  styles() {
    return {
      paper: {
        height: 500,
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
        height: 300,
        overflowY: 'auto',
        marginBottom: 24,
      },

      button: {
        marginRight: 20,
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
    }
  }
}

ReactAbsolute.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ReactAbsolute);
