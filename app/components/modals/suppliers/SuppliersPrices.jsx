/* global ReactMeteorData */

import React, { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import { Form, FormField, FormInput, Button, FormSelect, Glyph } from 'elemental';

@ReactMixin.decorate(ReactMeteorData)
export default class SuppliersPrices extends Component {
  static propTypes = {
    supplier: PropTypes.object
  }

  getMeteorData() {
    Meteor.subscribe("prices");

    const stations = Stations.find({}, {fields: {"tanks.gasoline": 1}}).fetch();
    let gasolines = [];
    stations.map(station => station.tanks.map(tank => gasolines.push(tank.gasoline)));
    gasolines = [...new Set(gasolines)];

    let prices = null;
    if (this.props.supplier) {
      prices = Prices.find({supplier: this.props.supplier.name}).fetch()
    }

    return {
      gasolines,
      prices
    }
  }

  render() {
    if (!this.props.supplier) { return <h3>escolha um fornecedor</h3>}

    return (
        <div>
          <SuppliersForm supplier={this.props.supplier} gasolines={this.data.gasolines}/>
          <SuppliersPricesTable prices={this.data.prices}/>
        </div>
    )
  }
}

class SuppliersPricesTable extends Component {
  static propTypes = {
    prices: PropTypes.array.isRequired
  }

  render() {

    return (
        <table>
          <tbody>
            {this.props.prices.map(price => <SuppliersPricesEdit price={price} key={price._id}/>)}
          </tbody>
        </table>
    )
  }
}

const inputStyles = {
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

class SuppliersPricesEdit extends Component {
  static propTypes = {
    price: PropTypes.object.isRequired
  }

  state = {
    value: this.props.price.price
  }

  render() {

    return (
        <tr style={{borderBottom: '1px solid #dedede'}}>
          <td style={{padding: 10, paddingRight: 30}}>{this.props.price.gasoline}</td>
          <td><input style={inputStyles} type="text" value={this.state.value} onChange={this.onChange}/></td>
          <td style={{cursor: 'pointer'}} onClick={() => Meteor.call('remove', this.props.price)}>&times;</td>
        </tr>
    )
  }

  onChange = (e) => {
    this.setState({value: e.target.value});

    var newPrice = this.props.price;
    newPrice.set('price', e.target.value);
    Meteor.call('save', newPrice)
  }
}

class SuppliersForm extends Component {
  static propTypes = {
    supplier: PropTypes.object.isRequired,
    gasolines: PropTypes.array.isRequired
  }

  state = {
    gasoline: this.props.gasolines[0],
    price: ''
  }

  render() {
    var gasolines = this.props.gasolines.map(gasoline => { return {label: gasoline, value: gasoline}});

    return (
        <Form type="inline" onSubmit={this.onSubmit} style={{marginTop: 10, marginBottom: 20}}>
          <FormSelect style={{minWidth: 100}} options={gasolines} onChange={gasoline => this.setState({gasoline})} />
          <FormField label="Preço" htmlFor="inline-form-input-price">
            <FormInput
                type="text"
                placeholder="0,00"
                name="inline-form-input-email"
                value={this.state.price}
                onChange={e => this.setState({price: e.target.value})}
            />
          </FormField>
          <FormField>
            <button
                className="Button Button--hollow-success"
                type="submit"
                disabled={this.state.price === ''}><Glyph icon="plus" /></button>
          </FormField>
        </Form>
    )
  }

  onSubmit = (e) => {
    e.preventDefault();
    var newPrice = new Price({
      supplier: this.props.supplier.name,
      gasoline: this.state.gasoline,
      price: this.state.price
    });

    Meteor.call('save', newPrice, err => {
      if (!err) {this.setState({price: ''})}
    })
  }
}