import React, { Component, PropTypes } from 'react';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

import PlansBuy from './PlansPrices'

const styles = {
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
  },

  tooltip: {
    background: '#eee',
    border: '1px solid #ccc',
    padding: 10,
    marginTop: 15,
    borderRadius: 3,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    position: 'relative'
  },

  pill: {
    backgroundColor: '#E8A990',
    borderRadius: 2,
    padding: 3,
    margin: 5,
    fontSize: 12
  }
}

export default class PlansSell extends Component {

  static propTypes = {
    style: PropTypes.object.isRequired
  }

  state = {
    focused: false
  }

  render() {
    var { plan, style, ...others} = this.props;

    return (
        <div style={style}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <input
                type="text"
                placeholder="1000.00"
                {...others}
                style={styles.input}
                onFocus={() => this.setState({focused: true})}
                onBlur={() => this.setState({focused: false})}
            />
            <div style={{position: 'absolute'}}>
              <ReactCSSTransitionGroup transitionName="tooltip">
                {this.renderTooltip(plan)}
              </ReactCSSTransitionGroup>
            </div>
          </div>
        </div>
    )
  }

  renderTooltip(plan) {
    if (this.state.focused) {
      return (
          <div style={styles.tooltip}>
            <table>
              {plan.references().map(reference => this.renderReference(reference))}
            </table>
          </div>
      )
    }
  }

  renderReference(plan) {
    return (
        <tr key={plan._id}>
          <td><span style={{margin: 5, marginRight: 10, fontSize: 12}}>{moment(plan.date).format('ddd, DD/MM/YYYY')}</span></td>
          <td><span style={{margin: 5, fontSize: 14}}>{this.formatNumber(plan.sell)}</span></td>
          <td>
            {plan.holiday? <span style={styles.pill}>{plan.holiday}</span> : undefined}
            {plan.dayType? <span style={styles.pill}>{plan.dayType}</span> : undefined}
          </td>
        </tr>
    )
  }

  formatNumber(number) {
    return (Math.round(number/100) * 100).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
