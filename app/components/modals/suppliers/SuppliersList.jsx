import React, { Component, PropTypes } from 'react';
import { Button } from 'elemental';

export default class SuppliersList extends Component {
  static propTypes = {
    suppliers: PropTypes.array.isRequired,
    onListClick: PropTypes.func.isRequired,
    selected: PropTypes.object
  }

  render() {
    return (
        <div style={{marginRight: 10, display: 'flex', flexDirection: 'column'}}>
          <Button  size="lg" type="hollow-primary" onClick={() => this.props.onListClick(null)}>novo</Button>
          <div style={{margin: 10, display: 'flex', flexDirection: 'column'}}>
            {this.props.suppliers.map(supplier => this.renderSupplier(supplier))}
          </div>
        </div>
    )
  }

  renderSupplier = (supplier) => {
    return (
        <Button style={{margin: 5}} size="xs" type="hollow-warning" key={supplier._id} onClick={() => this.props.onListClick(supplier)}>
          {supplier.name}
        </Button>
    )
  }
}