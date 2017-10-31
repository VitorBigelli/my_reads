import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Route exact path='/' render={ () => (
        	<h2> My reads </h2>
        )}/>

        <Route exact path='/search' render={ () => (
        	<h2> Book search </h2>
        )}/>


      </div>
    );
  }
}

export default App;
