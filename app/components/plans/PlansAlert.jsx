/* global ReactMeteorData */

import React, { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import { Alert, Button, Spinner } from 'elemental';

@ReactMixin.decorate(ReactMeteorData)
export default class PlansAlert extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired
  }

  getMeteorData() {

    var handle = Meteor.subscribe("plansAlert", this.props.station.name, moment().format('YYYY-MM-DD'));

    const plan = Plans.findOne({
      station: this.props.station.name,
      date: {$lt: moment().format('YYYY-MM-DD')},
      finalVolumeReal: null
    }, {limit: 1, sort: {date: 1}});

    let date = null;
    if (plan) {date = moment(plan.date).add(1, 'day')}

    return {
      planIsLoading: ! handle.ready(),
      plan: plan,
      date: date
    }
  }

  render() {
    if (this.data.plan) {
      if (this.data.planIsLoading) {
        return <Spinner size="lg" />
      }

      return (
          <Alert type="danger">
              Medição pendente para
              <strong> {this.data.plan.station}</strong> em
              <Button style={{margin: 5}} type="hollow-danger" size="xs" onClick={this.onClick}>
                {this.data.date.format('ddd, DD/MM/YYYY')}
              </Button>
          </Alert>
      )
    }
    return null;
  }

  onClick = () => {
    Session.set('modal', {
      type: 'beginVolume',
      date: this.data.date.format('YYYY-MM-DD'),
      station: this.props.station
    })
  }
}
