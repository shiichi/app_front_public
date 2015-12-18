import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class PayPal extends Component {

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
				<p><span className="icon paypal small"></span>を利用してチケットを購入します</p>
			</div>
			<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
				<input type="hidden" name="cmd" value="_s-xclick" />
				<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----" />
				<button type="submit" className="btn btn-danger">チケットを購入</button>
			</form>

			<div className="row">
				<div className="col-md-6">
					<h4>Step1</h4>
					<p>購入ボタンをクリックするとPayPalのページへ進みます。PayPalへログインしてください</p>
					<img src="/img/paypal1.jpg" />
				</div>
				<div className="col-md-6">
					<h4>Step2</h4>
					<p>送付先情報と合計金額を確認し、「同意して続行」ボタンをクリックしてお支払いを完了します。</p>
					<img src="/img/paypal2.jpg" />
				</div>
			</div>	
		</div>
    );
  }
}

export default PayPal;
