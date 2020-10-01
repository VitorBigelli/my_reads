import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import reading_image_1 from './assets/reading_image_2.png'
import reading_image_2 from './assets/reading_image_1.png'

import Login from './pages/Login'
import Home from './pages/Home'


function App () {
	
	return (
		<div className="App">
			<img src={reading_image_1} alt='...' className='reading_image_1' />
			<img src={reading_image_2} alt='...' className='reading_image_2' />
			<h1> <span role="img" aria-label="books">📚</span> My Reads </h1> 
			<Route path='/login' render={ () => <Login /> } />
			<Route path='/home' render={ () => <Home />} />
		</div>
	)
}

export default App;
