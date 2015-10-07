import React, { Component, PropTypes } from 'react';
import { Glyph } from 'elemental';

const styles = {
  title: {
    fontSize: 40,
    color: "rgba(11, 23, 70, 0.64)"
  }
}

export default class NavBar extends Component {
  render() {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 25, marginTop: 15}}>
          <span style={styles.title}>Gasoline</span>
          <span style={{cursor: 'pointer'}} onClick={() => Meteor.logout()}>
            <Glyph icon="log-out" type="default"/>
          </span>
        </div>
    )
  }
}
