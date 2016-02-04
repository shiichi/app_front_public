import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//Actions
import { routeActions } from 'react-router-redux';
import * as PinActions from '../../actions/pin/pin';
//Components
import RightMenu from './RightMenu';
import PinsTableBody from './PinsTableBody';

class Pins extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.actions.fetchPins();
    this.state = { page: 1, items: 1 };
  }

  handlePage(e, selectedEvent) {
    const page = selectedEvent.eventKey; 
    const { total, pathname, query, perPage, actions: {push} } = this.props;
    const skip = (page - 1) * perPage;
    const url = `${pathname}?sort=${query.filter || 'created'}&page=${page}&take=${perPage}`;

    push(url);
    this.setState({page});    
  }

  render() {
    const { page, items } = this.state;
    const { myId, myRoles, myPermissions, pins, isFetching, didInvalidate } = this.props;

    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">PinCode List</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <BootstrapTable data={pins} pagination={true}>
            <TableHeaderColumn
              dataField="pin"
              dataSort={true}
              isKey={true}>
              Code
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="numberOfTickets"
              dataSort={true}>
              NumberOfTickets
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="createdAt"
              dataSort={true}>
              Created
              </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

Pins.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  pins: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  isGenerating: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myId: state.myProfile.id,
    myRoles: state.myProfile.assigneesRoles,
    myPermissions: state.myProfile.assigneesPermissions,
    pins: state.pins.pins,
    isFetching: state.pins.isFetching,
    didInvalidate: state.pins.didInvalidate,
    isGenerating: state.pins.isGenerating,
    perPage: 10,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, PinActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps )(Pins);


/*
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>NumberOfTickets</th>
                  <th className="visible-lg">Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!didInvalidate && !isFetching && pins && 
                <PinsTableBody
                  myId={myId}
                  myRoles={myRoles}
                  myPermissions={myPermissions}
                  pins={pins}/>}
            </table>
            {!didInvalidate && isFetching && <Loading/>}
            <div className="pull-right">
              <Pagination
                first
                last
                ellipsis
                items={this.state.items}
                maxButtons={10}
                activePage={this.state.page}
                onSelect={this.handlePage.bind(this)} />
            </div>
*/