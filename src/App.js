import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BooksSearch from './components/BooksSearch';
import { books } from './data/books'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import RegisterBook from './components/RegisterBook';
import ManageBooks from './components/ManageBooks';

import { 
	DragDropContext,
	Draggable, 
	Droppable
} from 'react-beautiful-dnd'

import reading_image_1 from './assets/reading_1.jpeg'
import reading_image_2 from './assets/reading_2.jpeg'
import reading_image_3 from './assets/reading_3.jpeg'
import { Container, Card, Row, Col } from 'react-bootstrap';


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
		const { searchResult, loading } = this.state

		const bookshelfs = [
			{ title: 'Want to Read', shelf: 'listed' }, 
			{ title: 'Currently Reading', shelf: 'reading' }, 
			{ title: 'Read', shelf: 'read' }
		]

		console.log(books)

		return (
		  <div className="App">
			<img src={reading_image_1} alt='...' className='reading_image_1' />
			<img src={reading_image_2} alt='...' className='reading_image_2' />
			<img src={reading_image_3} alt='...' className='reading_image_3' />
		    
		    <Route exact path='/' render={ () => (
		    	<Container className='bookshelfs'>
	
		    		<Link to='/search' className='books-search-link' />
		    		<Link to='/manage' className='books-manage' />

		    		<h2 className='my-reads-header'> Vitor Bigelli's reads </h2>

					<div className='d-flex flex-row align-items-start justify-content-start'>
						<DragDropContext>
							{ bookshelfs.map( (bookshelf, index) => (
								<Droppable droppableId={`droppable droppable_${index}`} key={index} > 
									{(provided, snapshot) => (
										<div	
											ref={provided.innerRef}
											className={`droppable droppable_${index}`}
											>
											<h5> { bookshelf.title } </h5>
											{ books.map((item, index) => (
												item.status === bookshelf.shelf && <Draggable
													key={item.id}
													draggableId={item.id}
													index={index}>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															className='d-flex flex-row bookshelf-item'
														>
															<img src={item.cover_url} />
															<div className='d-flex flex-column justify-content-center book-info'>
																<h5> { item.title } </h5>
																<p> { item.author } </p>
															</div>	
														</div>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							))}
						</DragDropContext>
					</div>
		    	</Container>
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
