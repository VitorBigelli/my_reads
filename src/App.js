import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BooksSearch from './BooksSearch';
import Book from './Book';
import './App.css';

class App extends Component {

	state = {
		books: [],
		currentlyReading: [], 
		wantToRead: [], 
		read: []
	}

	componentDidMount() {
		BooksAPI.getAll().then( (books) => (
			this.setState( {books: books } ))
		)
	}

	updateBookcase = (previousBookcase, newBookcase, bookId) => (
		console.log(newBookcase)
	)

	render() {
		return (
		  <div className="App">
		    
		    <Route exact path='/' render={ () => (
		    	<div className='bookcases'>
		    		<h2 className='my-reads-header'> My reads </h2>

		    		<div className='currently-reading-list'>
		    			<h3> Currently reading </h3>
		    			
		    			<ul className='books-list'>
		    				{this.state.books.filter( (book) => (
		    					console.log(book)
		    				))}

		    			</ul>

		    		</div>

		    		<div className='want-to-read-list'>
		    			<h3> Want to read </h3>
		    			<ul className='books-list'>

		    			</ul>		    		</div>
		    		<div>

		    		<div className='read-list'>
		    			<h3> Read </h3>
		    			
		    			<ul className='books-list'>

		    			</ul>		    		</div>
		    		</div>

		    		<Link to='/search' className='books-search-link' />
		    		<Link to='/add' className='add-book-link' />

		    		<div>"Add book" icon made by <a href="https://www.flaticon.com/authors/picol" title="Picol">Picol</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

		    	</div>
		    )}/>

		    <Route exact path='/search' render={ () => (
   				<BooksSearch books={this.state.books} />
		    )}/>


		  </div>
		)
	}
}

export default App;
