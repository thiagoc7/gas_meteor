/* global ReactMeteorData */

import React, { Component, PropTypes } from 'react';
import { Form, FormField, FormInput, Button } from 'elemental';
import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class BeginVolumeModal extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired
  }

  getMeteorData() {
    var date = moment(this.props.date).subtract(1, 'day').format('YYYY-MM-DD');

    return {
      plans: Plans.find({date: date, station: this.props.station.name}).fetch()
    }
  }

  render() {
    return (
        <Form type="horizontal">
          <h3>{this.props.station.name}</h3>
          <h3>estoque inicial em {moment(this.props.date).format('DD/MM/YYYY - ddd')}</h3>
          {this.data.plans.map(plan => <BeginVolumeModalPlan key={plan._id} plan={plan}/>)}
          <FormField offsetAbsentLabel>
            <Button type="default" onClick={() => Session.set('modal', null)}>Fechar</Button>
          </FormField>
        </Form>
    );
  }
}

class BeginVolumeModalPlan extends Component {
  static propTypes = {
    plan: PropTypes.object.isRequired
  }

  state = {
    finalVolumeReal: this.props.plan.finalVolumeReal
  }

  render() {
    var label = this.props.plan.tank.gasoline + ' - Tanques ' + this.props.plan.tank.number.toString();

    return (
        <FormField label={label} htmlFor="horizontal-form-input-email">
          <FormInput
              type="text"
              placeholder="1000"
              name="horizontal-form-input-email"
              value={this.state.finalVolumeReal}
              onChange={this.onChange}
              />
        </FormField>
    )
  }

  onChange = (e) => {
    this.setState({finalVolumeReal: e.target.value});
    var newPlan = this.props.plan;
    newPlan.set('finalVolumeReal', e.target.value);
    Meteor.call('save', newPlan);
  }
}
