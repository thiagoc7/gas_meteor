/* global ReactMeteorData */

import React, { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    paddingRight: 10,
    fontSize: '0.8em'
  },

  pill: {
    backgroundColor: '#E5E5EC',
    borderRadius: 2,
    marginBottom: 4,
    padding: 3,
    cursor: 'pointer'
  }
}

@ReactMixin.decorate(ReactMeteorData)
export default class PlansPrices extends Component {

  static propTypes = {
    plan: PropTypes.object.isRequired,
  }

  getMeteorData() {
    Meteor.subscribe("prices");
    Meteor.subscribe("suppliers");

    return {
      prices: Prices.find({ gasoline: this.props.plan.tank.gasoline }).fetch(),
      suppliers: Suppliers.find().fetch(),
      priceDisplayTotal: Session.get('priceDisplayTotal')
    }
  }
  render() {
    if (this.props.plan.buy <= 0) { return null }

    const orderedPrices = this.data.prices.sort((a, b) => a.price > b.price)
    return (
        <div style={styles.base}>
          {orderedPrices.map(price => <div key={price._id} onClick={() => this.onClick(price)} style={styles.pill}>{price.supplier} - {this.displayPrice(price)}</div>)}
        </div>
    )
  }

  onClick(price) {
    Session.set('modal', {
      type: 'supplier',
      supplier: this.data.suppliers.filter(supplier => supplier.name == price.supplier)[0]
    })
  }

  displayPrice(price) {
    if (this.data.priceDisplayTotal) {
      return this.formatNumber(this.props.plan.buy * this.parsePrice(price.price))
    } else {
      return price.price
    }
  }

  parsePrice(value) {
    return parseFloat(value.replace(/,/g, '.'))
  }

  formatNumber(number) {
    return number.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
