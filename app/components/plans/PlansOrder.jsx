import React, { Component, PropTypes } from 'react';


const styles = {
  cell: {
    border: '1px solid #dedede',
    padding: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 50,
    paddingRight: 20,
    minWidth: 100,
    margin: 10
  },

  input: {
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
}

export default class PlansStation extends Component {

  render() {
    return (
        <div style={{display: 'flex'}}>

          <div style={{flex: 'auto', margin: 5}}>

            <h5>oliveira</h5>
            <div style={{display: 'flex'}}>

              <div style={styles.cell}>
                <h3>GC</h3>
                <div>
                  <input
                      type="text"
                      placeholder="1000.00"
                      style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.cell}>
                <h3>GC</h3>
                <div>
                  <input
                      type="text"
                      placeholder="1000.00"
                      style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.cell}>
                <h3>GC</h3>
                <div>
                  <input
                      type="text"
                      placeholder="1000.00"
                      style={styles.input}
                  />
                </div>
              </div>

            </div>
          </div>

          <div style={{flex: 'auto', margin: 5}}>
            <h5>outeiro</h5>
          </div>
        </div>
    )
  }
}


