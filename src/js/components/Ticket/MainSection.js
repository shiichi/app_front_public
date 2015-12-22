import React, { PropTypes, Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import CreditCard from './CreditCard';
//import PayPal from './PayPal';
//import PinCode from './PinCode';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentComponent: function(){}
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    //const request = {id: e.target[0].value};
    //this.props.validateReservation(request);
  }

  handleSelect(e) {
    const { changeTicketPanel } = this.props.actions;
    changeTicketPanel(e);
  }

  render() {
    const { ticketPanel } = this.props;
    const { setTicket, initTicket } = this.props.actions;

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

    console.log("aaa", PinCode)
    return (
      <Accordion activeKey={ticketPanel} onSelect={this.handleSelect.bind(this)} accordion>
        <Panel header={paypal} eventKey="1">
          <CreditCard setTicket={setTicket} initTicket={initTicket}/>
        </Panel>
        <Panel header={credit} eventKey="2">
          {PayPal && <PayPal/>}
        </Panel>
        <Panel header={pincode} eventKey="3">
          {PinCode && <PinCode/>}
        </Panel>
      </Accordion>
    );
  }
}

MainSection.propTypes = {
  ticketPanel: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
