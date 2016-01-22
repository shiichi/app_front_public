import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';
//actions
import * as AccessUserActions from '../../../actions/access/user';
//components
import Options from './Options';
import AssociatedRoles from './AssociatedRoles';
import OtherPermissions from './OtherPermissions';

class CreateUser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: null,
      first_name: null,
      last_name: null,
      age: null,
      sex: null,
      post1: null,
      post2: null,
      state: null,
      city: null,
      street: null,
      building: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, first_name, last_name, age, sex, post1, post2, state, city, street, building} = this.state;
    const request = {
      name: name.value,
      first_name: first_name.value,
      last_name: last_name.value,
      age: age.value,
      sex: sex.value,
      postal_code: post1.value + post2.value,
      state: state.value,
      city: city.value,
      street: street.value,
      building: building.value
    };

    this.props.UpdateUserProf(request);
  }

  handleChange(e) {
    const {name, value} = e.target;
    switch (name) {
    case 'name':
      if (!value) {
        this.setState({ name: {value: value, err: '必須項目です' }});
      } else {
        this.setState({ name: {value: value, err: false }});
      }
      break;
    case 'firstName':
      this.setState({ first_name: {value: value, err: false }});
      break;
    case 'lastName':
      this.setState({ last_name: {value: value, err: false }});
      break;
    case 'sex':
      this.setState({ sex: {value: value, err: false }});
      break;
    case 'age':
      if (/^[\d]{1,3}$/i.test(value)) {
        this.setState({ age: {value: value, err: false }});
      } else {
        this.setState({ age: {value: value, err: '無効な年齢です'}});
      }
      break;
    case 'post1':
      if (/^\d{3}$/i.test(value)) {
        this.setState({ post1: {value: value, err: false }});
      } else {
        this.setState({ post1: {value: value, err: '郵便番号が正しくありません'}});
      }
      break;
    case 'post2':
      if (/^\d{4}$/i.test(value)) {
        this.setState({ post1: {value: this.state.post1.value, err: false }});
      } else {
        this.setState({ post1: {value: this.state.post1.value, err: '郵便番号が正しくありません'}});
      }
      this.setState({ post2: {value: value, err: false }});

      break;
    case 'state':
      this.setState({ state: {value: value, err: false }});
      break;
    case 'city':
      this.setState({ city: {value: value, err: false }});
      break;
    case 'street':
      this.setState({ street: {value: value, err: false }});
      break;
    case 'building':
      this.setState({ building: {value: value, err: false }});
      break;
    default :
    }
  }

  render() {
    console.log(this.props.routeParams)
    return (
      <div className="box-body">
        <form className="form-horizontal">
          <Input type="text" label="Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Input type="text" label="E-mail" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Input type="password" label="Password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Input type="password" label="Password Confirmation" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Options/>
          <AssociatedRoles/>
          <OtherPermissions/>
        </form>
      </div>
    );
  }
}

CreateUser.propTypes = {
  myId: PropTypes.number.isRequired,
  users: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  asyncStatus: PropTypes.array,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
    myProfile: state.myProfile,
    pageStatus: state.pageStatus,
    alert: state.alert,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccessUserActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(CreateUser);
