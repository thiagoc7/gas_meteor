/* global ReactMeteorData */

import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import {Row, Col, Card} from 'elemental';

import PlansComponent from './../components/plans/PlansComponent'
import PlansFilter from './../components/plans/PlansFilter'

@ReactMixin.decorate(ReactMeteorData)
export default class PlanPage extends Component {

  getMeteorData() {
    const startDate = Session.get('startDate');
    const finalDate = Session.get('finalDate');
    var dates = moment.range(moment(startDate), moment(finalDate));
    var dateRange = [];
    dates.by('days', date => dateRange.push(date.format('YYYY-MM-DD')));

    Meteor.subscribe("stations");
    Meteor.subscribe("plans");

    return {
      user: Meteor.user(),
      dates: dateRange,
      startDate: startDate,
      finalDate: finalDate,
      stations: Stations.find().fetch()
    }
  }

  render() {
    if (this.data.user) {
      return (
          <div>
            <Card>
              <PlansFilter
                  startDate={this.data.startDate}
                  finalDate={this.data.finalDate}
                  stations={this.data.stations}
              />
            </Card>
            <Row>
              <Col>
                <PlansComponent dates={this.data.dates} stations={this.data.stations}/>
              </Col>

            </Row>
          </div>
      )
    } else {
      return <h1 style={{cursor: 'pointer'}} onClick={() => Meteor.loginWithGoogle({})}>Login com Google</h1>
    }
  }
}
