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
    plan: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired
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
                onChange={e => this.setState({buy: e.target.value})}
                onBlur={this.onBuyBlur}
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
          idx={this.props.idx}
          plan={this.props.plan}
          value={this.state.sellForecast}
          onChange={e => this.setState({sellForecast: e.target.value})}
          onBlur={this.onSellForecastBlur}
          />
    }
  }

  onBuyBlur = () => {
    var newPlan = this.props.plan;
    newPlan.set('buy', this.state.buy);
    Meteor.call('save', newPlan);
  }

  onSellForecastBlur = () => {
    var newPlan = this.props.plan;
    newPlan.set('sellForecast', this.state.sellForecast);
    Meteor.call('save', newPlan);
  }

  formatNumber(number) {
    return (Math.round(number/100) * 100).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
