import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BooksSearch from './BooksSearch';
import Bookcase from './Bookcase';
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
			this.setState( {books: books.map( (book) => (
				<Book book={book} onChangeBookcase={ (bookId, newBookcase, prevBookcase) => this.modifyBookcase(bookId, newBookcase, prevBookcase)}/>
			))})
		))
	}

	modifyBookcase = (bookId, newBookcase, previousBookcase) => (
		this.setState( {
			currentlyReading: this.state.currentlyReading.concat( 
				this.state.books.filter( (book) => (
					book.props.book.id == bookId)
				)
			)
		})
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
		    				<Bookcase 
		    					bookcase='currentlyReading' 
		    					books={this.state.currentlyReading} 
		    				/>
		    			</ul>

		    		</div>

		    		<div className='want-to-read-list'>
		    			<h3> Want to read </h3>
		    			<ul className='books-list'>
		    				<Bookcase 
		    					bookcase='wantToRead'
		    					books={this.state.wantToRead}
		    				/>
		    			</ul>	
		    		</div>
		    		
		    		<div className='read-list'>
		    			<h3> Read </h3>
		    			
		    			<ul className='books-list'>
 							<Bookcase 
		    					bookcase='read'
		    					books={this.state.read}
		    				/>		    				
		    			</ul>
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
