import React, { PropTypes, Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import CreditCard from './CreditCard';
//import PayPal from './PayPal';
//import PinCode from './PinCode';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      panel: this.props.num || "1"
    };
  }

  handleSelect(e) {
    this.setState({ panel: e });
  }

  render() {
    const { panel } = this.state;
    const { fetchWebpay, fetchPin } = this.props.actions;

    var PinCode;
    require.ensure([], () => {
      PinCode = require('./PinCode.js');
    });

    var PayPal;
    require.ensure([], () => {
      PayPal = require('./PayPal.js');
    });

    const credit = (
      <p>PayPalアカウンントをお持ちの方<span className="icon paypal"></span></p>
    );
    const paypal = (
      <p>クレジットカードを利用される方<span className="icon webpay"></span></p>
    );
    const pincode = (
      <p>シリアルコードをお持ちの方</p>
    );

    return (
      <Accordion activeKey={panel} onSelect={this.handleSelect.bind(this)} accordion>
        <Panel header={paypal} eventKey="1">
          <CreditCard fetchWebpay={fetchWebpay}/>
        </Panel>
        <Panel header={credit} eventKey="2">
          {PayPal && <PayPal/>}
        </Panel>
        <Panel header={pincode} eventKey="3">
          {PinCode && <PinCode fetchPin={fetchPin}/>}
        </Panel>
      </Accordion>
    );
  }
}

MainSection.propTypes = {
  ticketPanel: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
