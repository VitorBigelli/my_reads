import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import { books } from './data/books'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import { 
	DragDropContext,
	Draggable, 
	Droppable
} from 'react-beautiful-dnd'

import {ReactTinyLink} from 'react-tiny-link'

import reading_image_1 from './assets/reading_image_2.png'
import reading_image_2 from './assets/reading_image_1.png'
import { Container, Card, Row, Col, Modal, Button } from 'react-bootstrap';
import header_image from './assets/header.png'

import { move, reorder, ID } from './utils/helpers'
import RegisterBook from './components/RegisterBook';

import { 
	FaPlus
} from 'react-icons/fa'


class App extends Component {

	constructor(props) {
		super(props); 
		this.state = { ...books, searchResult: [], loading: false }
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

		this.setState( { 
			books: JSON.parse(cachedBooks), 
			searchResult: [] 
		});
	}

	addBook = (url) => {
		const newBooks = this.state["want_to_read"].concat([{
			"id": ID(), 
			"amazon_link": url
		}])

		this.updateLocalStorage(newBooks)
		this.setState({
			'want_to_read': newBooks,
			showModal: false
		})
	}

	// This function delete a book
	deleteBook = (bookId) => {
		const filteredBooks = this.state.books.filter( _ => _.id !== bookId)
		this.updateLocalStorage(filteredBooks)
		this.updateState(filteredBooks)
	}

	onDragEnd(result) { 
		const { source, destination } = result 

		if (!destination.droppableId) {
			return null 
		} else {

			if (destination.droppableId === source.droppableId) {

				const items = reorder(
					this.state[source.droppableId],
					source.index, 
					destination.index
				) 


				this.setState({
					[source.droppableId]: items
				})

			} else {
				
				const result = move(
					this.state[source.droppableId],
					this.state[destination.droppableId],
					source,
					destination
				)

				this.setState({
					[source.droppableId]: result[source.droppableId], 
					[destination.droppableId]: result[destination.droppableId]
				})

			}

		}


		

	}


	// Clear the localStorage
	restoreDefault = () => {
		localStorage.clear();
		this.componentDidMount();
	}

	render() {
		const { searchResult, loading } = this.state

		const bookshelfs = [
			{ title: 'Want to Read', shelf: 'want_to_read' }, 
			{ title: 'Currently Reading', shelf: 'reading' }, 
			{ title: 'Read', shelf: 'read' }
		]

		return (
		  <div className="App">
			<img src={reading_image_1} alt='...' className='reading_image_1' />
			<img src={reading_image_2} alt='...' className='reading_image_2' />
		    
		    <Route exact path='/' render={ () => (
		    	<Container className='bookshelfs'>
			    	<button onClick={ () => this.setState({ showModal: true })} className='books-manage'>
						<FaPlus fill='#fff' size={30} />	
					</button>

		    		<img src={header_image} alt='...' className='header-image' />

					<div className='d-flex flex-row align-items-start justify-content-start'>
						<DragDropContext onDragEnd={ (e) => this.onDragEnd(e)}>
							{ bookshelfs.map( (bookshelf, index) => (
								<Droppable droppableId={bookshelf.shelf} key={index} > 
									{(provided, snapshot) => (
										<div	
											ref={provided.innerRef}
											className={`droppable droppable_${index}`}
											>
											<h5> { bookshelf.title } </h5>
											{ this.state[bookshelf.shelf].map((item, index) => (
												<Draggable
													key={item.id}
													draggableId={item.id}
													index={index}>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															className='d-flex bookshelf-item'
														>
															{ item.amazon_link && <ReactTinyLink   
																cardSize="small"
																showGraphic={true}
																maxLine={2}
																minLine={1}
																url={item.amazon_link} 
															/>} 
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

			<Modal 
				show={this.state.showModal}
			>
				<RegisterBook 
					onSubmit={(url) => this.addBook(url)}
				/>
			</Modal>
		    
		  </div>
		)
	}
}

export default App;
