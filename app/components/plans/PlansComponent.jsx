import React, { Component, PropTypes } from 'react';
import { Card, Row, Col, Table } from 'elemental';

import PlansStation from './PlansStation'
import PlansDate from './PlansDate'
import PlansOrder from './PlansOrder'

export default class PlansComponent extends Component {
  static propTypes = {
    dates: PropTypes.array.isRequired,
    stations: PropTypes.array.isRequired
  }

  state = {
    isOrder: false
  }

  render() {
    return (
        <div>
          {this.props.dates.map(date => this.renderDate(date))}
        </div>
    )
  }

  renderDate(date) {
    return (
        <Card key={date}>
          <PlansDate date={date} isOrder={this.state.isOrder} toggleIsOrder={() => this.setState({isOrder: !this.state.isOrder})} />
          <div style={{display: 'flex'}}>
            {this.state.isOrder ? <PlansOrder/> : this.props.stations.map(station => <PlansStation key={station._id} station={station} date={date}/>)}
          </div>
        </Card>
    )
  }

}
