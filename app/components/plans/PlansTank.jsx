import React, { Component, PropTypes } from 'react';

import PlansPrices from './PlansPrices'
import PlansSell from './PlansSell'

const styles = {
  cell: {
    borderBottom: '1px solid #dedede',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexBasis: 50,
    paddingRight: 20
  },

  input: {
    border: 0,
    display: 'block',
    resize: 'none',
    font: 'inherit',
    padding: 0,
    margin: 0,
    outline: 'none',
    width: '100%',
    background: 'transparent'
  }
}

export default class PlansTank extends Component {
  static propTypes = {
    plan: PropTypes.object.isRequired
  }

  state = {
    sellForecast: this.props.plan.sellForecast,
    buy: this.props.plan.buy
  }

  render() {
    let {buy, maxBuy, minBuy} = this.props.plan;

    const beginStyles = {
      span: {
        transition: '200ms all linear',
        color: buy > maxBuy ? '#d64242' : '#34c240'
      }
    }

    const finalStyles = {
      span: {
        transition: '200ms all linear',
        color: buy < minBuy ? '#d64242' : '#34c240'
      }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={styles.cell}>{this.props.plan.tank.gasoline}</div>
          <div style={styles.cell}>
            <span style={beginStyles.span}>{this.formatNumber(this.props.plan.beginVolume)}</span>
          </div>
          {this.renderSell()}
          <div style={styles.cell}>
            <input
                type="text"
                placeholder="1000.00"
                style={styles.input}
                value={this.state.buy}
                onChange={this.onBuyChange}
                />
          </div>
          <div style={styles.cell}>
            <span style={finalStyles.span}>{this.formatNumber(this.props.plan.finalVolume)}</span>
          </div>
          <PlansPrices plan={this.props.plan} />
        </div>
    )
  }

  renderSell() {
    if (this.props.plan.finalVolumeReal) {
      return <div style={styles.cell}><span style={{color: '#777'}}>{this.formatNumber(this.props.plan.sell)}</span></div>
    } else {
      return <PlansSell
          style={styles.cell}
          plan={this.props.plan}
          value={this.state.sellForecast}
          onChange={this.onSellForecastChange.bind(this)}
          />
    }
  }

  onBuyChange = (e) => {
    this.setState({buy: e.target.value});
    var newPlan = this.props.plan;
    newPlan.set('buy', e.target.value);
    Meteor.call('save', newPlan);
  }

  onSellForecastChange(e) {
    this.setState({sellForecast: e.target.value});
    var newPlan = this.props.plan;
    newPlan.set('sellForecast', e.target.value);
    Meteor.call('save', newPlan);
  }

  formatNumber(number) {
    return (Math.round(number/100) * 100).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
