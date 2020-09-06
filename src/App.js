import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BooksSearch from './components/BooksSearch';
import Bookshelf from './components/Bookshelf';
import './App.css';
import RegisterBook from './components/RegisterBook';
import ManageBooks from './components/ManageBooks';


class App extends Component {

	constructor(props) {
		super(props); 
		this.state = { books: [], searchResult: [], loading: false }
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
			this.setState( { 
				books: JSON.parse(cachedBooks), 
				searchResult: [] 
			});
			return;
		} 

		this.getAllBooks()
	}

	addBook = (book, books = this.state.books) => {
		const newBooks = books.concat([book])

		this.updateLocalStorage(newBooks)
		this.updateState(newBooks)
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
		
		this.addBook(book)
	}

	// This function is called when the user updates a book
	updateBook = (values, book) => {

		const filteredBooks = this.state.books.filter( _ => (_.id !== book.id) )

		const updatedBook = {
			id: book.id,
			title: values.title, 
			authors: values.authors.split('; '),
			imageLinks: {
				thumbnail: book.imageLinks.thumbnail
			},
			shelf: book.shelf
		}
		
		this.addBook(updatedBook, filteredBooks)

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
		
		let newBooks = this.state.books.filter( _ => _.id !== book.id)

		book.shelf = event.target.value

		if (book.shelf === 'none') {
			this.deleteBook(book.id)
		} else {
			newBooks = newBooks.concat([book])
		}

		this.updateState(newBooks)
		this.updateLocalStorage(newBooks)
	}

	search = (query) => {
		this.setState({
			loading: true
		})

		BooksAPI.search(query, 20).then( (books) => {
			
			let result = []

			if (Object.prototype.toString.call( books ) === '[object Array]') {
				result = books.filter( book => {
					this.state.books.map( _ => {
						if (_.id === book.id) {
							book.shelf = _.shelf
						}
					})
					return true;
				})
			} 

			this.setState({
				searchResult: result,
				loading: false 
			})
		})
	}

	// Clear the localStorage
	restoreDefault = () => {
		localStorage.clear();
		this.componentDidMount();
	}

	render() {
		const { books, searchResult, loading } = this.state

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
   					loading={loading}
   				/>
		    )}/>

		    <Route exact path='/register' render={ ({history}) => (
		    	<RegisterBook onSubmit={ values => {
		    		this.registerBook(values)
		    		history.push('/manage')
		    	}} />
		    	)}
		    />

		    <Route exact path='/manage' render={ ({history}) => (
		    	<ManageBooks 
		    		books={books}
		    		updateBook={ (values, book) => {
		    				this.updateBook(values, book)
		    				history.push('/')
		    				}
		    		}
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
