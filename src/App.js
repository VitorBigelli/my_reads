import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BooksSearch from './BooksSearch';
import Bookshelf from './Bookshelf';
import './App.css';
import RegisterBook from './RegisterBook';
import ManageBooks from './ManageBooks';

class App extends Component {

	state = {
		books: []
	}

	componentDidMount() {

		const cachedBooks = localStorage.getItem('myReads');

		if (cachedBooks) {
			this.setState( { books: JSON.parse(cachedBooks) } );
			return;
		} 

		BooksAPI.getAll().then( (books) => {
			books.map( book => book.status = 'None')
			this.updateLocalStorage(books)
			this.updateState(books)
		})
	}

	// This function updates the 'myReads' in localStorage
	updateLocalStorage = (books) => {
		localStorage.setItem('myReads', JSON.stringify(books))
		return;
	}

	// This function updates the App component state
	updateState = (newBooks) => {
		this.setState( { books: newBooks } )
		return;
	}

	// This function is called when the user register a new book
	registerBook = ({ title, author, cover}) => {

		const book = {
			id: this.state.books.length + 1,
			title: title, 
			authors: [author],
			imageLinks: {
				thumbnail: cover
			} 
		}
		const newBooks = this.state.books.concat([book]) 
		
		this.updateLocalStorage(newBooks)
		this.updateState(newBooks)
	}

	// This function is called when the user updates a book
	updateBook = (values, book) => {

		const { title, author } = values

		const filteredBooks = this.state.books.filter( _ => (_.id !== book.id) )

		const updatedBook = {
			id: book.id,
			title: title, 
			authors: [author],
			imageLinks: {
				thumbnail: book.imageLinks.thumbnail
			},
			status: book.status
		}
		const newBooks = filteredBooks.concat( [ updatedBook ]);
		
		this.updateLocalStorage(newBooks)
		this.updateState(newBooks)

		window.alert('Book updated')
	}

	// This function delete a book
	deleteBook = (bookId) => {
		const filteredBooks = this.state.books.filter( _ => _.id !== bookId)
		this.updateLocalStorage(filteredBooks)
		this.updateState(filteredBooks)
	}

	// This function is called when the user change 
	// a book to a new bookshelf
	onChangeBookshelf = (event, book) => {
		event.preventDefault() 
		book.status = event.target.value 
		console.log(book.id)
		const filteredBooks = this.state.books.filter( _ => (_.id !== book.id))
		const newBooks = filteredBooks.concat( [book] )

		this.updateLocalStorage(newBooks)
		this.updateState(newBooks)
	}

	// Clear the localStorage
	restoreDefault = () => {
		localStorage.clear();
		this.componentDidMount();
	}

	render() {
		const { books } = this.state

		const bookshelfs = [
			{ title: 'Currently Reading', books }, 
			{ title: 'Want to Read', books }, 
			{ title: 'Read', books }
		]

		return (
		  <div className="App">
		    
		    <Route exact path='/' render={ () => (
		    	<div className='bookshelfs'>
	
		    		<Link to='/search' className='books-search-link' />
		    		<Link to='/manage' className='books-manage' />
	
		    		<div className='my-reads-header-bg'></div>
		    		<h2 className='my-reads-header'> My reads </h2>

		    		{ bookshelfs.map( bookshelf => (
		    			<Bookshelf
		    				key={bookshelf.title} 
		    				title={bookshelf.title}
		    				books={bookshelf.books}
		    				onChangeBookshelf={ (event, book) => this.onChangeBookshelf(event, book)}
		    			/>
		    		))}

	    		
		    		<footer>
		    		<p> "Add book" icon made by <a href="https://www.flaticon.com/authors/picol" title="Picol">Picol</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> </p>
		    		<p> "Gears" icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> </p>
		    		</footer>


		    	</div>
		    )}/>

		    <Route exact path='/search' render={ () => (
   				<BooksSearch 
   					books={books} 
   					onChangeBookshelf={ (event, book) => this.onChangeBookshelf(event, book) }
   				/>
		    )}/>

		    <Route exact path='/register' render={ ({history}) => (
		    	<RegisterBook onSubmit={ values => {
		    		this.registerBook(values)
		    		history.push('/manage')
		    	}} />
		    	)}
		    />

		    <Route exact path='/manage' render={ () => (
		    	<ManageBooks 
		    		books={books}
		    		updateBook={ (values, book) => this.updateBook(values, book) }
		    		deleteBook={ (book) => this.deleteBook(book)}
		    		restoreDefault={this.restoreDefault}
		    	/>

		    	)}
		    />
		  </div>
		)
	}
}

export default App;
