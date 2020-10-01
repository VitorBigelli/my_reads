import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import Login from './pages/Login'
import Home from './pages/Home'
import Switch from 'react-bootstrap/esm/Switch';

function App () {
	
	return (
		<div className="App">
			<Route path='/login' render={ () => <Login /> } />
			<Route path='/home' render={ () => <Home />} />
		</div>
	)
}

export default App;
