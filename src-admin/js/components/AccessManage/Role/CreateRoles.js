import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Input, Row, Col } from 'react-bootstrap';
//Utility
import { validate } from '../../../utils/ValidationUtils';
//Actions
import * as AccessRoleActions from '../../../actions/access/role';
import * as AccessPermissionActions from '../../../actions/access/permission';
import * as InitializeActions from '../../../actions/initialize';

class CreateRoles extends Component {
  constructor(props, context) {
    super(props, context);
    const string = ['name', 'sort'].reduce((request, key) => {
      request[key] = {value: '', status: '', message: ''};
      return request;
    }, {});

    const array = [ 'assigneesPermissions' ].reduce((request, key) => {
      request[key] = {value: [], status: '', message: ''};
      return request;
    }, {});

    this.state = Object.assign(string, array);
  }

  componentWillMount() {
    const { clearValidationAlert, clearAddress } = this.props.actions;
    clearValidationAlert();
    clearAddress();
  }

  componentDidMount() {
    const { fetchPermissions } = this.props.actions;
    fetchPermissions();
  }

  componentWillReceiveProps(nextProps) {
    const { dependency } = nextProps;
    if (dependency) {
      this.setState({ assigneesPermissions: {
        value: this.state.assigneesPermissions.value.concat(dependency),
        status: '',
        message: ''
      }});
    }
  }

  validate(name, value, checked) {
    const { fetchPermissionDependency } = this.props.actions;

    switch (name) {
    case 'assigneesPermissions':
      if (checked) {
        fetchPermissionDependency(value);
        this.setState({[name]: {
          value: this.state[name].value.concat([Number(value)]),
          status: '',
          message: ''
        }});
      } else {
        this.setState({[name]: {
          value: this.state[name].value.filter(p => p !== Number(value)),
          status: '',
          message: ''
        }});
      }
      break;

    default:
      this.setState({[name]: validate(name, value)});
    }
  }

  handleChange(e) {
    const { name, value, checked } = e.target;
    this.validate(name, value, checked);
  }

  handleHover() {
    for (let key in this.state) {
      if (this.state[key].value === '') {
        this.validate(key, this.state[key].status);
      }
    }
  }

  handleSubmit() {
    const { createUser } = this.props.actions;
    const Keys = Object.keys(this.state);
    const hasError = Keys.some(key =>
      this.state[key].status === 'error'
    );

    if (!hasError) {
      createUser(Keys.reduce((request, key) => {
        request[key] = this.state[key].value;
        return request;
      }, {}));
    }
  }

  renderPermissions() {
    const { permissions } = this.props;
    const { value } = this.state.assigneesPermissions;
    return permissions.map(permission =>
      <div className="col-xs-offset-2 col-xs-10" key={permission.id}>
        <div className="checkbox">
          <label className>
            <input type="checkbox"
                   value={permission.id}
                   name="assigneesPermissions"
                   checked={value.indexOf(permission.id) >= 0 ? true : ''}/>
            <span><strong>{permission.displayName}</strong></span>
          </label>
        </div>
      </div>
    );
  }

  render() {
    const { name, sort } = this.state;
    const hasError = Object.keys(this.state).some(key =>
      this.state[key].status === 'error'
    );
console.log(this.state)
    return (
      <div className="box-body">
        <form className="form-horizontal" onChange={this.handleChange.bind(this)}>
          <Input type="text" label="Name" name="name" placeholder="Role Name"
            bsStyle={name.status}
            labelClassName="col-xs-2"
            wrapperClassName="col-xs-10"
            help={name.message}/>
          <Input type="text" label="Sort" name="sort" placeholder="Sort"
            bsStyle={sort.status}
            labelClassName="col-xs-2"
            wrapperClassName="col-xs-10"
            help={sort.message}/>
          {this.renderPermissions()}
        </form>
        <div className="pull-left">
          <Link to="/access/users" className="btn btn-danger btn-xs" >Cancel</Link>
        </div>
        <div className="pull-right">
          <button className="btn btn-success btn-xs" disabled={hasError}
                  onClick={this.handleSubmit.bind(this)}
                  onMouseOver={this.handleHover.bind(this)}>Create</button>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

CreateRoles.propTypes = {
  lang: PropTypes.string.isRequired,
  validationError: PropTypes.string.isRequired,
  permissions: PropTypes.array.isRequired,
  dependency: PropTypes.array
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
    validationError: state.validationError,
    permissions: state.permissions.permissions,
    dependency: state.dependency
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(AccessRoleActions, AccessPermissionActions, InitializeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(CreateRoles);
