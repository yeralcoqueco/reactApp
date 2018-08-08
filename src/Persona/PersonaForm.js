import React, { Component } from 'react';
import './PersonaForm.css';

class PersonaForm extends Component {
  constructor() {
    super();
    this.addPersona = this.addPersona.bind(this);
  }

  addPersona(){
    this.props.addPersonaHandler(this.textInput.value);
    this.textInput.value='';
    this.textInput.focus();

  }

  render() {
    return(
    <div className="PersonaForm">
      <input 
      placeholder="Nueva persona"
      ref={input => {this.textInput = input;}}
      type="text" />
      <button
      onClick={this.addPersona}>Agregar</button>
    </div>
    )
  }
}

export default PersonaForm;