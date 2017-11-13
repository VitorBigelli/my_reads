import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BooksSearch from './BooksSearch';
import Bookcase from './Bookcase';
import './App.css';

class App extends Component {

	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then( (books) => (
			this.setState( { books } )
		))
	}

	render() {
		const { books } = this.state

		const bookcases = [
			{ title: 'Currently Reading', books }, 
			{ title: 'Want To Read', books }, 
			{ title: 'Read', books }
		]

		return (
		  <div className="App">
		    
		    <Route exact path='/' render={ () => (
		    	<div className='bookcases'>
		    		
		    		<h2 className='my-reads-header'> My reads </h2>

		    		{ bookcases.map( bookcase => (
		    			<Bookcase 
		    				title={bookcase.title}
		    				books={bookcase.books}
		    			/>
		    		))}

		    		<Link to='/search' className='books-search-link' />

		    		<div>"Add book" icon made by <a href="https://www.flaticon.com/authors/picol" title="Picol">Picol</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

		    	</div>
		    )}/>

		    <Route exact path='/search' render={ () => (
   				<BooksSearch books={books} />
		    )}/>

		    
		  </div>
		)
	}
}

export default App;
