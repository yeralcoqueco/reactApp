import React, { Component } from 'react';
import './App.css';
import Persona from './Persona/Persona';
import PersonaForm from './Persona/PersonaForm';
import firebase from 'firebase';
import 'firebase/database';
import { DB_config } from './config/config';

class App extends Component {

  constructor() {
    super();

    this.state = {
      personas: [
        //{ personaId: 1, personaNombre: 'Dana' },
        //{ personaId: 2, personaNombre: 'Yeral' }
      ]
    };

    this.app = firebase.initializeApp(DB_config);
    this.db = this.app.database().ref().child('persona');

    this.addPersonaHandler = this.addPersonaHandler.bind(this);
    this.removePersonaHandler = this.removePersonaHandler.bind(this);
  }


  //método de ciclo de vida del componente
  componentDidMount() {
    const { personas } = this.state;

    this.db.on('child_added', snap => {
      personas.push({
        personaId: snap.key,
        personaNombre: snap.val().personaNombre
      })
      this.setState({ personas });
    });

    this.db.on('child_removed', snap => {
      for (let i = 0; i < personas.length; i++) {
        if (personas[i].personaId = snap.key) {
          personas.splice(i, 1);
        }
        this.setState({ personas });
      }
      this.setState({ personas });
      
    });

  }

  removePersonaHandler(personaId) {
    this.db.child(personaId).remove();
  }

  addPersonaHandler(persona) {
    /*let {personas} = this.state;
    personas.push({
      personaId : personas.length + 1,
      personaNombre : persona
    });
    this.setState({ personas })*/
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
