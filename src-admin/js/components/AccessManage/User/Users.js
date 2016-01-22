import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import Icon from 'react-fa';
import { REQUEST_ALLUSERS } from '../../../../config/url';
//Utility
import { fetchWithJson } from '../../../utils/fetchUtils';
//Actions
import * as AccessActions from '../../../actions/access';
//Components
import UsersTableBody from './UsersTableBody';
import MessageInTable from '../../Common/MessageInTable';
import Loading from '../../Common/Loading';

class Users extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activePage: 1,
      perpage: 10,
      items: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    const { fetchUsers } = this.props.actions;
    const { path, total } = nextProps;
    const { activePage, perpage } = this.state;

    if (total !== this.props.total) {
      this.setState({
        items: Math.ceil(total / perpage),
      });
    };

    if (path !== this.props.path) {
      fetchUsers(activePage, perpage);
    };
  }

  componentDidMount() {
    const { fetchUsers } = this.props.actions;
    const { activePage, perpage } = this.state;

    fetchUsers(activePage, perpage);
  }

  handlePage(e, selectedEvent) {
    const activePage = selectedEvent.eventKey;
    const { fetchUsers } = this.props.actions;
    const { perpage } = this.state;

    this.setState({ activePage });
    fetchUsers(activePage, perpage);
  }

  render() {
    const { activePage, perpage, items } = this.state;
    const { myId, users, isFetching, didInvalidate, asyncStatus, actions } = this.props;

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
              <th>Other Permissions</th>
              <th className="visible-lg">Created</th>
              <th className="visible-lg">Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          {!didInvalidate && !isFetching && users && 
            <UsersTableBody
              myId={myId}
              users={users}
              asyncStatus={asyncStatus}
              activePage={activePage}
              perpage={perpage}
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
            activePage={this.state.activePage}
            onSelect={this.handlePage.bind(this)} />
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  myId: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  users: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  asyncStatus: PropTypes.array,
  path: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myId: state.myProfile.id,
    total: state.users.total,
    users: state.users.users,
    isFetching: state.users.isFetching,
    didInvalidate: state.users.didInvalidate,
    asyncStatus: state.users.asyncStatus,
    path: state.routing.path
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccessActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps )(Users);
