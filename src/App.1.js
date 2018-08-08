//VIDEOS DEL CURSO DE REACT


import React, { Component } from 'react';
import './App.css';
import Persona from './Persona/Persona'
import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCR_ze-puFEJyE4htQyHghwGFICfCLmNuA',
  authDomain: 'react-guia.firebaseapp.com',
  databaseURL: 'https://react-guia.firebaseio.com',
  projectId: 'react-guia',
  storageBucket: 'react-guia.appspot.com',
  messagingSenderId: '767018470670'
}

firebase.initializeApp(config)


class App extends Component {

  state = {
    personas: [
      { id: '1asd', nombre: 'Dana ', edad: 19 },
      { id: '2fgh', nombre: ' Yeral', edad: 57 },
      { id: '3yth', nombre: 'Chomy', edad: 25 },
      { id: '4ivb', nombre: 'Anibal', edad: 52 }
    ],
    showPersonas: true
  }

  //método de ciclo de vida
  componentWillMount() {
    const rootRef = firebase.database().ref().child('persona');
    const nameRef = rootRef.child('nombre');
    nameRef.on('value', snap => {
      this.setState({
        nombre: snap.val()
      });
    });

  }

  eliminarPersonaHandler = (personaIndex) => {
    //forma incorrecta const personas = this.state.personas;
    //crear una nueva matriz , no mutar el estado original
    const personas = [...this.state.personas];
    personas.splice(personaIndex, 1);
    this.setState({ personas: personas })
  }

  cambioNombreHandler = (event, id) => {
    const personaIndex = this.state.personas.findIndex(p => {
      return p.id === id;
    });

    const persona = {
      ...this.state.personas[personaIndex]
    };

    persona.nombre = event.target.value;

    const personas = [...this.state.personas];
    personas[personaIndex] = persona;

    this.setState({ personas: personas });
  }

  tooglePersonasHandler = () => {
    const doesShow = this.state.showPersonas;
    this.setState({ showPersonas: !doesShow })
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

    let personas = null;
    if (this.state.showPersonas) {
      personas = (
        <div>
          {this.state.personas.map((persona, index) => {
            return <Persona
              nombre={persona.nombre}
              edad={persona.edad}
              key={persona.id}
              cambio={(event) => this.cambioNombreHandler(event, persona.id)}
              clic={() => this.eliminarPersonaHandler(index)} />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>CRUD</h1>
        <button style={style}
          onClick={this.tooglePersonasHandler}> Mostrar/Ocultar
        </button>
        <button style={style}> Agregar + </button>
        {personas}
      </div>
    );
  }
}

export default App;
