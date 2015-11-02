/* global ReactMeteorData */

import React, { Component, PropTypes } from 'react';
import { Button, Glyph } from 'elemental';
import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class PlansDate extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    isOrder: PropTypes.bool.isRequired,
    toggleIsOrder: PropTypes.func.isRequired
  }


  getMeteorData() {
    Meteor.subscribe("plans", this.props.date, this.props.date);
    const plans = Plans.find({date: this.props.date}).fetch();
    let totalBuy = 0;
    let buyErrors = 0;
    plans.map(plan => {
      totalBuy += plan.buy;
      if ((plan.buy > plan.maxBuy) || (plan.buy < plan.minBuy)) {
        buyErrors += 1
      }
    });

    return {
      totalBuy: totalBuy.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      buyErrors
    }
  }

  render() {
    return (
        <div style={{marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
          <h2>{moment(this.props.date).format('ddd, DD/MM/YYYY')}</h2>
          <div>
            <Button type={this.data.buyErrors > 0 ? "hollow-danger" : "hollow-success"} style={{margin: 5}}><Glyph icon="graph" /> {this.data.totalBuy}</Button>
            <Button type="hollow-success" onClick={this.props.toggleIsOrder}><Glyph icon="mail" /></Button>
          </div>
        </div>
    )
  }
}
