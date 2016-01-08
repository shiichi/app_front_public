import React, { PropTypes, Component } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { sortLogs, filterLogsByMethod, filterLogsByAction } from '../../utils/SortUtils';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activePage: 1,
      items: 1,
      orderBy: 'created_at',
      asc: true,
      method: ['webpay', 'pin', 'paypal', 'led', 'vege', 'fish'],
      logs: props.logs || null
    };
  }

  componentDidMount() {
    const { fetchLog } = this.props.actions;
    fetchLog(1);
  }

  componentWillReceiveProps(nextProps) {
    const { logs } = nextProps;
    const { orderBy, asc } = this.state;
    this.state = {
      logs: sortLogs(logs, 1, orderBy, asc),
      items: logs.length / 3
    };
  }

  handlePage(e, selectedEvent) {
    const page = selectedEvent.eventKey;
    const { logs } = this.props;
    const { orderBy, asc } = this.state;

    this.setState({
      activePage: page,
      logs: sortLogs(logs, page, orderBy, asc)
    });
  }

  handleFilter(e) {
    const { checked, value } = e.target;
    const { logs } = this.props;
    const { method } = this.state;
    console.log(this.state)

    if(checked) {
      const a = method.slice().push(value);
      //const a = method.concat([value]);
    } else {
      const a = method.filter(m => m != value);
    }

    filterLogsByMethod()

    this.setState({
      method: ['webpay', 'pin', 'payoal'],
    });
  }

  renderLog() {
    const { logs } = this.state;
    return logs.map((l, i) =>
      <tr key={i}>
        {l.action > 0 && <th>{l.action}枚購入</th>}
        {l.action < 0 && <th>{l.action}枚消費</th>}
        <td>{l.method}</td>
        <td>{l.created_at}</td>
      </tr>
    );      
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        <div className="center-block" style={{width: '400px'}} onChange={this.handleFilter.bind(this)}>
          <div>
            <label className="checkbox-inline">
              <input type="checkbox" name="method" value="credit"/>クレジットカード
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" name="method" value="paypal"/>PayPal
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" name="method" value="pin" disabled=""/>PINコード
            </label>
          </div>
          <div>
            <label className="checkbox-inline">
              <input type="checkbox" name="method" value="led"/>LEDチカチカ
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" name="method" value="vege"/>植物育成
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" name="method" value="fish" disabled=""/>魚鑑賞
            </label>
          </div>
        </div>
        <Table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>追加枚数</th>
              <th>手段</th>
              <th>使用日</th>
            </tr>
          </thead>
          <tbody>
          {!isFetching && this.renderLog()}
          </tbody>
        </Table>
        <div className="center-block" style={{width: '300px'}}>
          <Pagination
            first
            last
            ellipsis
            items={this.state.items}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handlePage.bind(this)} />
        </div>
      </div>
    );
  }
}

MainSection.propTypes = {
  logs: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
