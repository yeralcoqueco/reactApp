import React, { Component } from 'react';
import './App.css';
import Persona from './Persona/Persona';
import PersonaForm from './Persona/PersonaForm';
import { firebase } from './firebase';

class App extends Component {

  constructor() {
    super();

    this.state = {
      personas: []
    };

    const database = firebase.database();
    this.db = database.ref().child('persona');

    this.addPersonaHandler = this.addPersonaHandler.bind(this);
    this.removePersonaHandler = this.removePersonaHandler.bind(this);
  }


  //método de ciclo de vida del componente
  componentDidMount() {

    this.db.on('child_added', snap => {
      let persona = {
        personaId: snap.key,
        personaNombre: snap.val().personaNombre
      }
      this.setState((state, prop) => ({ personas: [...state.personas, persona] }));
    });

    this.db.on('child_removed', snap => {
      this.setState((state, prop)=>({
        personas: state.personas.filter(person =>person.personaId !== snap.key)
      }))
    });

  }

  removePersonaHandler(personaId) {
    this.db.child(personaId).remove();
  }

  addPersonaHandler(persona) {
    this.db.push().set({ personaNombre: persona });
  }

  render() {
    const style = {
      // propiedad: 'cadena'
      backgroundColor: 'rgb(238, 186, 16)',
      border: 'none',
      color: 'white',
      padding: '10px 24px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline - block',
      margin: '4px 2px',
      cursor: 'pointer',
      fontSize: '14px'
    };

    return (
      <div className="App">
      <button onClick={()=>console.log(this.state)}>print state</button>
        <h1>Perfiles</h1>
        <button style={style}> Mostrar/Ocultar</button>
        <PersonaForm addPersonaHandler={this.addPersonaHandler} />
        <div>
          {this.state.personas.map(persona => {
            return (
              <Persona
                personaId={persona.personaId}
                personaNombre={persona.personaNombre}
                key={persona.personaId}
                removePersona={this.removePersonaHandler}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
