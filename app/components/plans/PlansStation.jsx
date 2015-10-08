/* global ReactMeteorData */

import React, { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import { Glyph, Spinner } from 'elemental';

import PlansTank from './PlansTank';

const tableLabels = [
    '-',
    'Estoque Initial',
    'Vendas',
    'Compras',
    'Estoque Final'
]

const styles = {
  cell: {
    borderBottom: '1px solid #dedede',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexBasis: 50,
    paddingRight: 20
  },

  pill: {
    backgroundColor: '#E8A990',
    borderRadius: 2,
    padding: 3,
    margin: 5,
    fontSize: 12
  }
}

@ReactMixin.decorate(ReactMeteorData)
export default class PlansStation extends Component {

  static propTypes = {
    station: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired
  }

  getMeteorData() {
    //Meteor.subscribe("plansFilter", this.props.station.name, this.props.date);
    var handle = Meteor.subscribe("plans", Session.get('startDate'), Session.get('finalDate'));

    return {
      plans: Plans.find({
        station: this.props.station.name,
        date: this.props.date
      }).fetch(),
      plansLoading: ! handle.ready()
    }
  }

  render() {
    if (this.data.plansLoading) {
      return <Spinner size="lg" />
    }

    var warningIcon = undefined;
    if (!this.data.plans[0].beginVolumeReal) { warningIcon = <Glyph icon="alert" type="warning"/> }

    return (
        <div style={{flex: 'auto', margin: 5}}>
          <h3>
            {this.props.station.name}
            {this.data.plans[0].holiday? <span style={styles.pill}>{this.data.plans[0].holiday}</span> : undefined}
            {this.data.plans[0].dayType? <span style={styles.pill}>{this.data.plans[0].dayType}</span> : undefined}
          </h3>
          <div style={{display: 'flex', flex: 'auto'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={styles.cell}>-</div>
              <div style={styles.cell}>
                <span style={{cursor: 'pointer'}} onClick={this.onBeginVolumeClick}>
                  Estoque Initial {warningIcon}
                </span>
              </div>
              <div style={styles.cell}>Vendas</div>
              <div style={styles.cell}>Compras</div>
              <div style={styles.cell}>Estoque Final</div>
            </div>
            {this.data.plans.map(plan => <PlansTank plan={plan} key={plan._id}/>)}
          </div>
        </div>
    )
  }

  onBeginVolumeClick = () => {
    Session.set('modal', {
      type: 'beginVolume',
      date: this.props.date,
      station: this.props.station
    })
  }
}
