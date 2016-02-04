import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'react-bootstrap';
//Components
import RightMenu from './RightMenu';

class GeneratePin extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ticket: 1,
      pin: 1,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log('handleSubmit')
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.refs)
    console.log(e.target)
  }

  render() {
    const { ticket, pin } = this.state;
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Generate Pin-Code</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <form
            className="form-horizontal"
            onChange={this.handleChange.bind(this)}
            onClick={this.handleSubmit.bind(this)}>
            <Input type="select" label="獲得できるチケットの枚数" name="ticket" ref="ticket"
              value={ticket}
              labelClassName="col-xs-3"
              wrapperClassName="col-xs-5 col-sm-3 col-md-2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Input>
            <Input type="select" label="発行するPINコードの数" name="pin" ref="pin"
              value={pin}
              labelClassName="col-xs-3"
              wrapperClassName="col-xs-5 col-sm-3 col-md-2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Input>
            <button className="btn btn-default" disabled="">画面出力</button>
            <button className="btn btn-default" disabled="">メールで送信</button>
          </form>
        </div>
      </div>
    );
  }
}

GeneratePin.propTypes = {
  routing: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect( mapStateToProps )(GeneratePin);
