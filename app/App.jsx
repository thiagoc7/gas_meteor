import React, { Component, PropTypes } from 'react';

import ModalComponent from './pages/ModalComponent'
import Plans from './pages/Plans'
import NavBar from './components/NavBar'

import './styles.less';
import 'react-datepicker/dist/react-datepicker.css';

export default class App extends Component {
  //componentWillMount() {
  //}

  render() {
    return (
        <div>
          <NavBar />
          <div style={{margin: 20}}>
            <Plans />
          </div>
          <ModalComponent />
        </div>
    )
  }
}
