/* global ReactMeteorData */

import React, { Component, PropTypes } from 'react';
import { Form, FormField, FormInput, Button, Pill } from 'elemental';
import ReactMixin from 'react-mixin';

import SuppliersList from './suppliers/SuppliersList'
import SuppliersForm from './suppliers/SuppliersForm'
import SuppliersPrices from './suppliers/SuppliersPrices'

@ReactMixin.decorate(ReactMeteorData)
export default class SuppliersModal extends Component {
  static propTypes = {
    supplier: PropTypes.object
  }

  constructor(props) {
    super(props);
    let isPrice = false;
    if (props.supplier) { isPrice = true; }
    this.state = {
      selected: this.props.supplier,
      isPrice: isPrice
    }
  }

  getMeteorData() {
    Meteor.subscribe('suppliers');
    return {
      suppliers: Suppliers.find().fetch()
    }
  }

  render() {
    var name = "Novo Fornecedor";
    if (this.state.selected) {name = this.state.selected.name}

    var buttonLabel = "Preços";
    if (this.state.isPrice) {buttonLabel = 'Cadastro'}

    return (
        <div style={{display: 'flex'}}>

          <div style={{flexGrow: 1}}>
            <SuppliersList
                selected={this.state.selected}
                suppliers={this.data.suppliers}
                onListClick={selected => this.setState({selected})}
                />
          </div>

          <div style={{flexGrow: 2, width: 500, margin: 10, padding: 10}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h2 style={{textAlign: 'center'}}>{name}</h2>
              <Button type="hollow-primary" onClick={() => this.setState({isPrice: !this.state.isPrice})}>{buttonLabel}</Button>
            </div>
            {this.renderForm()}
          </div>


        </div>
    );
  }

  renderForm() {
    if (this.state.isPrice) {
      return <SuppliersPrices supplier={this.state.selected} />
    }
    return <SuppliersForm supplier={this.state.selected} />
  }

  onListClick = (selected) => {
    this.setState({selected: selected})
  }
}