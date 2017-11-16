import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BooksSearch from './BooksSearch';
import Bookshelf from './Bookshelf';
import './App.css';
import RegisterBook from './RegisterBook';
import ManageBooks from './ManageBooks';

class App extends Component {

	constructor(props) {
		super(props); 
		this.state = { books: [], searchResult: [] }
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

	getAllBooks() {
		BooksAPI.getAll().then( (books) => {
			this.updateLocalStorage(books)
			this.updateState(books)
		})
	}

	componentDidMount() {

		const cachedBooks = localStorage.getItem('myReads');

		if (cachedBooks) {
			this.setState( { books: JSON.parse(cachedBooks) } );
			return;
		} 

		this.getAllBooks()
	}


	// This function is called when the user register a new book
	registerBook = ({ title, author, cover, shelf}) => {

		const book = {
			id: this.state.books.length + 1,
			title: title, 
			authors: [author],
			imageLinks: {
				thumbnail: cover
			},
			shelf: shelf 
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
			shelf: book.shelf
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
		book.shelf = event.target.value

		this.setState( {
			books: this.state.books.filter( _ => _.id !== book.id).concat([book])
		})
	}

	search = (query) => {
		BooksAPI.search(query, 40).then( (books) => {
			this.setState( {
				searchResult: books
			})
		})
	}

	// Clear the localStorage
	restoreDefault = () => {
		localStorage.clear();
		this.componentDidMount();
	}

	render() {
		const { books, searchResult } = this.state

		const bookshelfs = [
			{ title: 'Currently Reading', shelf: 'currentlyReading', books }, 
			{ title: 'Want to Read', shelf: 'wantToRead', books }, 
			{ title: 'Read', shelf: 'read', books }
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
		    				shelf={bookshelf.shelf}
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
   					onChangeBookshelf={ (event, book) => this.onChangeBookshelf(event, book) }
   					search={(query) => this.search(query)}
   					books={searchResult}
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
