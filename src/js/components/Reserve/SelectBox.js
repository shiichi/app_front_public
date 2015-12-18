import React, { PropTypes, Component } from 'react';
import Icon from 'react-fa';

class SelectBox extends Component {

  handleChanged(e) {
    if (!this.props.isFetching && e.target.checked ) {
      if (e.target.name === 'type') this.props.handleType(Number(e.target.value));
      if (e.target.name === 'place') this.props.handlePlace(Number(e.target.value));
    } else {
      console.log('now loading');
    }
  }

  renderType() {
    const { flightTypes } = this.props.selector;
    if (flightTypes) {
      return flightTypes.map(t =>
        <div>
          <input type="radio" id={t.en} name="type" value={t.id} checked={t.checked} />
          <label htmlFor={t.en} >{t.name}</label>
        </div>
      );
    }
    return ( <Icon spin name="spinner" /> );
  }

  renderPlace() {
    const { places } = this.props.selector;
    const style = path => {
      return {
        nblock: {
          background: `url(${path})`,
          backgroundSize: '150px 100px'
        },
        block: {
          background: `url(${path})`,
          backgroundSize: '150px 100px',
          pointerEvents: 'none'
        }
      };
    };

    const renderPlace = [];
    if (places) {
      for (let p of places) {
        const { nblock, block } = style(p.path);
        if (p.active) {
          renderPlace.push( <input type="radio" style={nblock} name="place" value={p.id} key={p.id} checked={p.checked} /> );
        } else {
          renderPlace.push( <input type="radio" style={block} name="place" value={p.id} key={p.id} checked={p.checked} /> );
        }
      }
      return renderPlace;
    }

    return ( <Icon spin name="spinner" /> );
  }

  render() {
    return (
      <form className="select-box" onChange={this.handleChanged.bind(this)}>
        <div className="type clearfix" >
          <p id="type">タイプ　<a href=""><Icon name="question-circle" /></a></p>
          {this.renderType()}
        </div>
        <div className="place clearfix" >
          <p id="place">場所　<a href=""><Icon name="question-circle" /></a></p>
          {this.renderPlace()}
        </div>
      </form>
    );
  }
}

SelectBox.propTypes = {
  selector: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleType: PropTypes.func.isRequired,
  handlePlace: PropTypes.func.isRequired,
};

export default SelectBox;
