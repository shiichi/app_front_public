import React, { PropTypes, Component } from 'react';
import Panel from './Panel';

class MainSection extends Component {
  render() {
    const { reservation, cancel } = this.props;
    console.log(reservation);

      const renderPanel = reservation.map(r =>
        <Panel status={r} cancel={cancel} />
      );

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <a data-toggle="collapse" data-parent="#sampleAccordion" href="#sampleAccordionCollapse1">
              クレジットカードを利用される方<div className="icon webpay"></div>
            </a>
          </h3>
        </div>
        <div id="sampleAccordionCollapse1" className="panel-collapse collapse in">
          <div className="panel-body">
            <div className="buy-head">
              <p>クレジットカードを利用してチケットを購入します</p>
              <div className="card-list">
                <div className="card-icon visa"></div>
                <div className="card-icon master"></div>
                <div className="card-icon jcb"></div>
                <div className="card-icon amex"></div>
                <div className="card-icon diners"></div>
              </div>
            </div>

            <form className="form-card" action="http://boiler.com/ticket/addByWebpay" method="post">
              <input type="text" className="hidden" />
              <input type="hidden" name="_token" value="{{ csrf_token() }}" />
              <div className="form-group ticket">
                <label><i className="i2 fa fa-ticket"></i>　チケット枚数</label>
                <div className="input-area">
                  <input type=number min="1" max="9" name="ticket" value="1" onChange="payment.value = Number(ticket.value) * 1000;" />
                  <input type=button className="btn-add" onClick="plus(this.form)" />
                  <input type=button className="btn-sub" onClick="minus(this.form)" />  
                </div>
                <label>枚</label>          
              </div>
              <div className="payment">
                <label><i className="i2 fa fa-jpy"></i>　支払額</label>
                <output name="payment">1000</output>
                <label>円</label>
              </div>
              <script src="https://checkout.webpay.jp/v1/" className="webpay-button"
                data-text="カード情報を入力"
                data-key="test_public_f9va9N1e58PT9M7gXz8iwdi8"
                data-partial="true">
              </script>
              <div className="pay">
                <button className="btn btn-danger" type="button" onclick="submit();">チケットを購入</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MainSection;