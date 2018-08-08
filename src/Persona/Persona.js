import React, { Component } from 'react';
import './Persona.css';

class Persona extends Component {
  constructor(props) {
    super(props);
    this.personaId = props.personaId;
    this.personaNombre = props.personaNombre;
  }

  removeHandler(id){
    this.props.removePersona(id);

  }


  render(){
    return(
      <div className="Persona">
			<p >Hello! Mi nombre es {this.personaNombre}</p>
			<button className="buttonUpdate">Editar</button>
			<button onClick={() => this.removeHandler(this.personaId)} className="buttonDelete">Eliminar</button>

			{/* <input type="text" onChange={props.cambio} value={props.nombre} /> */}
		</div>
    )
    
  }
}

export default Persona;