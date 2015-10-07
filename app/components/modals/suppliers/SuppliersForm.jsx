import React, { Component, PropTypes } from 'react';
import { Form, FormField, FormInput, Button, Pill } from 'elemental';

export default class SuppliersForm extends Component {
  static propTypes = {
    supplier: PropTypes.object
  }

  constructor(props) {
    super(props);

    let model = props.supplier;
    if (!model) { model = new Supplier() }
    this.state = { model: model }
  }

  componentWillReceiveProps(nextProps) {
    let model = nextProps.supplier;
    if (!model) { model = new Supplier() }
    this.setState({model})
  }

  render() {
    var name = "Novo Fornecedor";
    if (!this.state.model._isNew) {name = this.state.model.name}
    return (
        <Form onSubmit={this.onSubmit}>
          <FormField label="Nome" htmlFor="basic-form-name">
            <FormInput
                type="text"
                placeholder="Nome"
                name="basic-form-name"
                value={this.state.model.name}
                onChange={(e) => {
                      let newModel = this.state.model;
                      newModel.set('name', e.target.value);
                      this.setState({model: newModel})
                    }}
                />
          </FormField>
          <FormField label="Contato" htmlFor="basic-form-contact">
            <FormInput
                type="text"
                placeholder="Contato"
                name="basic-form-contact"
                value={this.state.model.contact}
                onChange={(e) => {
                      let newModel = this.state.model;
                      newModel.set('contact', e.target.value);
                      this.setState({model: newModel})
                    }}
                />
          </FormField>

          <SuppliersFormArray
              label="email"
              value={this.state.model.emails}
              onChange={(value) => {
                      let model = this.state.model;
                      model.set('emails', value);
                      this.setState({model})
                    }}
              />

          <SuppliersFormArray
              label="fone"
              value={this.state.model.phones}
              onChange={(value) => {
                      let model = this.state.model;
                      model.set('phones', value);
                      this.setState({model})
                    }}
              />

          <button className="Button Button--hollow-success" type="submit">Salvar</button>
          <Button style={{marginLeft: 20}} type="hollow-danger" onClick={() => this.state.model.remove()}>Apagar</Button>
        </Form>
    )
  }

  onSubmit = (e) => {
    e.preventDefault();
    Meteor.call('save', this.state.model, function(error) {
      if (!error) { Session.set('modal', null) }
    })
  }
}



class SuppliersFormArray extends Component {
  static propTypes = {
    value: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  state = {
    newValue: ''
  }

  render() {
    return (
        <div style={{marginTop: 10, marginBottom: 20, borderTop: 'grey'}}>
          <FormField label={this.props.label} htmlFor={"basic-form-" + this.props.label}>
            <FormInput
                type="text"
                ref="input"
                placeholder={this.props.label}
                name={"basic-form-" + this.props.label}
                onKeyDown={this.onKeyDown}
                />
          </FormField>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {this.props.value.map(prop => <Pill style={{marginBottom: 10}} key={prop} label={prop} type="primary" onClear={() => this.onClear(prop)} />)}
          </div>
        </div>
    )
  }

  onKeyDown = (e) => {
    var domNode = React.findDOMNode(this.refs.input);
    var value = domNode.value;

    if (e.keyCode == 13 && (value !== '')) {
      e.preventDefault();
      var newArray = this.props.value;
      newArray.unshift(value);
      this.props.onChange(newArray);
      domNode.value = '';
    }
  }

  onClear = (prop) => {
    var newArray = this.props.value.slice();
    var index = newArray.indexOf(prop);
    newArray.splice(index, 1);
    this.props.onChange(newArray);
  }
}



