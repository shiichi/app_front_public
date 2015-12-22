import React, { PropTypes, Component } from 'react';

class PinCode extends Component {
  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    //const request = {id: e.target[0].value};
    //this.props.validateReservation(request);
  }

  render() {
    const { reservation, cancel } = this.props;
    return (
		<div className="panel-body">
			<div className="buy-head">
				<p>お持ちのシリアルコードを入力してください。</p>
			</div>
			<div>
				<form className="form-pin" action="http://boiler.com/ticket/ticket/addByPin" method="post">
					<input type="hidden" name="_token" value="{{ csrf_token() }}" />
					<button className="btn btn-danger" type="button" onclick="submit();">チケットを購入</button>
					<input type="text" name="pin" className=""/>
				</form>
			</div>
		</div>
    );
  }
}

export default PinCode;
