import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import Icon from 'react-fa';
//Actions
import { routeActions } from 'react-router-redux';
import * as AccessUserActions from '../../../actions/access/user';
//Components
import UsersTableBody from './UsersTableBody';
import MessageInTable from '../../Common/MessageInTable';
import Loading from '../../Common/Loading';

class Users extends Component {
  constructor(props, context) {
    super(props, context);
    const { query, perPage } = props;
    this.state = {
      page: Math.ceil(query.skip / perPage) + 1,
      items: Math.ceil(query.skip / perPage) + 1
    };
  }

  componentWillReceiveProps(nextProps) {
    const { fetchUsers } = this.props.actions;
    const { total, search, perPage } = nextProps;

    if (total !== this.props.total || perPage !== this.props.perPage) {
      this.setState({
        items: Math.ceil(total / perPage),
      });
    };

    if (search !== this.props.search) {
      fetchUsers();
    };
  }

  componentDidMount() {
    const { fetchUsers } = this.props.actions;
    fetchUsers();
  }

  handlePage(e, selectedEvent) {
    const page = selectedEvent.eventKey;    
    const { total, pathname, query, perPage, actions: {push} } = this.props;
    const skip = (page - 1) * perPage;
    const url = `${pathname}?filter=${query.filter}&skip=${skip}&take=${perPage}`;

    push(url);
    this.setState({page});
  }

  render() {
    const { page, items } = this.state;
    const { myId, myRoles, myPermissions, users, isFetching, didInvalidate, asyncStatus, actions } = this.props;

    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Confirmed</th>
              <th>Roles</th>
              <th className="visible-lg">Created</th>
              <th className="visible-lg">Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          {!didInvalidate && !isFetching && users && 
            <UsersTableBody
              myId={myId}
              myRoles={myRoles}
              myPermissions={myPermissions}
              users={users}
              asyncStatus={asyncStatus}
              actions={actions}/>}
        </table>
        {!didInvalidate && isFetching && <Loading/>}
        {didInvalidate && <MessageInTable/>}
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
      </div>
    );
  }
}

Users.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  asyncStatus: PropTypes.object,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myId: state.myProfile.id,
    myRoles: state.myProfile.assigneesRoles,
    myPermissions: state.myProfile.assigneesPermissions,
    total: state.users.total,
    users: state.users.users,
    isFetching: state.users.isFetching,
    didInvalidate: state.users.didInvalidate,
    asyncStatus: state.users.asyncStatus,
    pathname: state.routing.location.pathname,
    search: state.routing.location.search,
    perPage: 10,
    query: state.routing.location.query
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, AccessUserActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps )(Users);
