/* global ReactMeteorData */

import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import { Modal, ModalBody, ModalHeader } from 'elemental';

import BeginVolume from './../components/modals/BeginVolumeModal'
import Suppliers from './../components/modals/SuppliersModal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth              : '50%'
  }
};

@ReactMixin.decorate(ReactMeteorData)
export default class ModalComponent extends Component {

  getMeteorData() {
    return {
      modal: Session.get('modal')
    }
  }

  render() {
    var modalIsOpen = !!this.data.modal;

    return (
        <Modal isOpen={modalIsOpen} onCancel={() => Session.set('modal', null)} backdropClosesModal>
          <ModalHeader showCloseButton onClose={() => Session.set('modal', null)} />
          <ModalBody>
            <div>
              {this.data.modal? this.renderModal() : undefined}
            </div>
          </ModalBody>
        </Modal>
    )
  }

  renderModal() {
    if (this.data.modal.type === 'beginVolume') {
      return <BeginVolume
          station={this.data.modal.station}
          date={this.data.modal.date}
      />
    } else if (this.data.modal.type === 'supplier') {
      return <Suppliers
          supplier={this.data.modal.supplier}
      />
    }
  }
}
