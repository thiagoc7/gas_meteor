import React, { Component, PropTypes } from 'react';
import { Button, Glyph } from 'elemental';
import DatePicker from 'react-datepicker';

import PlansAlert from './PlansAlert'

export default class PlansFilter extends Component {
  static propTypes = {
    stations: PropTypes.array.isRequired,
    startDate: PropTypes.string.isRequired,
    finalDate: PropTypes.string.isRequired
  }

  render() {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>

            <div style={{display: 'flex', alignItems: 'center'}}>
              <span style={{margin: 5}}>entre </span>
              <DatePicker
                  selected={moment(this.props.startDate)}
                  dateFormat={'DD/MM/YYYY'}
                  weekdays={["Sab", 'Dom', "Seg", "Ter", "Qua", "Qui", "Sex"]}
                  onChange={date => Session.set('startDate', date.format('YYYY-MM-DD'))} />
              <span style={{margin: 5}}> e </span>
              <DatePicker
                  selected={moment(this.props.finalDate)}
                  dateFormat={'DD/MM/YYYY'}
                  weekdays={["Sab", 'Dom', "Seg", "Ter", "Qua", "Qui", "Sex"]}
                  onChange={date => Session.set('finalDate', date.format('YYYY-MM-DD'))} />
            </div>

            <div>
              <Button type="hollow-success"><Glyph icon="rocket" /></Button>
              <Button type="hollow-success" style={{margin: 5}} onClick={this.onSupplierClick}><Glyph icon="person" /></Button>
              <Button type="hollow-primary" onClick={this.onPricesClick}><Glyph icon="clippy" /></Button>
            </div>
          </div>

          <div style={{marginTop: 15}}>
            {this.props.stations.map(station => <PlansAlert key={station._id} station={station} />)}
          </div>

        </div>
    )
  }

  onSupplierClick = () => {
    Session.set('modal', {
      type: 'supplier',
      supplier: null
    })
  }

  onPricesClick = () => {
    const newSession = !Session.get('priceDisplayTotal');
    Session.set('priceDisplayTotal', newSession);
  }

}
