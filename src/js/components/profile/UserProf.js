import React, { PropTypes, Component } from 'react';
import { Table, Button } from 'react-bootstrap';

class UserProf extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.user.name || null,
      age: this.props.user.age || null,
      sex: this.props.user.sex || null,
      address: this.props.user.address || null
    };
  }

  handleChange(e) {
    switch(e.target.name){
      case 'name':
        this.setState({ name: e.target.value });
        break;
      case 'age':
        this.setState({ age: e.target.value });
        break;
      case 'sex':
        this.setState({ sex: e.target.value });
        break;
      case 'address':
        this.setState({ address: e.target.value });
        break;
      default:
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this)
  }

  render() {
    console.log("render",this.props.user)

    const { name, age, sex, address } = this.state;

    return (
      <div>
        <Table condensed hover>
          <tbody>
          <tr>
            <th>名前</th>
            <td><input type="text" name="name" value={name} onChange={this.handleChange.bind(this)} /></td>
          </tr>
          <tr>
            <th>年齢</th>
            <td><input type="text" name="age" value={age} onChange={this.handleChange.bind(this)} /></td>
          </tr>
          <tr>
            <th>性別</th>
            <td><input type="text" name="sex" value={sex} onChange={this.handleChange.bind(this)} /></td>
          </tr>
          <tr>
            <th>住所</th>
            <td><input type="text" name="address" value={address} onChange={this.handleChange.bind(this)} /></td>
          </tr>
          </tbody>
        </Table>
        <Button bsStyle="danger" onclick={this.handleSubmit.bind(this)}>保存する</Button>
      </div>
    );
  }
}

UserProf.propTypes = {
  ticketPanel: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

export default UserProf;
