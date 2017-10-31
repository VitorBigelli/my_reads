import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI'
import './App.css';

class App extends Component {

	state = {
		currentlyReading: [],
		wantToRead: [],
		read: [],
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then( (books) => (
			this.setState( {books} )
		))
	}

	render() {
	return (
	  <div className="App">
	    
	    <Route exact path='/' render={ () => (
	    	<div className='bookcases'>
	    		<h2 className='my-reads-header'> My reads </h2>

	    		<div className='currently-reading-list'>
	    			<h3> Currently reading </h3>

	    		</div>

	    		<div className='want-to-read-list'>
	    			<h3> Want to read </h3>

	    		</div>

	    		<div className='read-list'>
	    			<h3> Read </h3>

	    		</div>
	    	</div>
	    )}/>

	    <Route exact path='/search' render={ () => (
	    	<h2> Book search </h2>
	    )}/>


	  </div>
	);
	}
}

export default App;
