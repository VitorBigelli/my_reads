import React, { Component } from 'react';
import { books } from '../data/books'

import {
	DragDropContext,
	Draggable,
	Droppable
} from 'react-beautiful-dnd'


import { Container, Modal } from 'react-bootstrap';

import { move, reorder, ID } from '../utils'
import RegisterBook from '../components/RegisterBook';

import {
	TiDocumentAdd,
	TiDelete,
	TiLink
} from 'react-icons/ti'

const bookshelfs = [
	{ title: 'Want to Read', shelf: 'want_to_read' },
	{ title: 'Currently Reading', shelf: 'reading' },
	{ title: 'Read', shelf: 'read' }
]

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { ...books }
	}

	// This function updates the 'myReads' in localStorage
	updateLocalStorage = (books) => {
		localStorage.setItem('myReads', JSON.stringify(books))
		return;
	}

	// This function updates the App component state
	updateState = (newBooks) => {
		this.setState({ books: newBooks })
		return;
	}

	componentDidMount() {

		const cachedBooks = localStorage.getItem('myReads');

		this.setState({
			...JSON.parse(cachedBooks),
			searchResult: []
		});
	}

	addBook = (data) => { 

		const newBooks = this.state["want_to_read"].concat([{
			"id": ID(),
			...data 
		}])

		this.setState({
			'want_to_read': newBooks,
			showModal: false
		}, (state) => this.updateLocalStorage({ ...this.state }))
	}

	// This function delete a book
	deleteBook = (status, bookIndex) => {
		const filteredBooks = this.state[status].filter( (_, index) => index !== bookIndex)
		
		this.setState({
			[status]: filteredBooks, 
		}, (state) => this.updateLocalStorage({ ...this.state }))
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
				}, (state) => this.updateLocalStorage({ ...this.state })) 
				

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
				}, (state) => this.updateLocalStorage({ ...this.state }))

			}

		}




	}

	render() {
		return (
			<Container className='home'>
				<button onClick={() => this.setState({ showModal: true })} className='books-manage'>
					<TiDocumentAdd fill='#333' size={30} />
				</button>
				<div className='d-flex flex-row align-items-start justify-content-center lists-container'>
					<DragDropContext onDragEnd={(e) => this.onDragEnd(e)}>
						{bookshelfs.map((bookshelf, index) => (
							<Droppable droppableId={bookshelf.shelf} key={index} className='droppable'>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										className={`droppable droppable_${index}`}
									>
										<h5> {bookshelf.title} ({this.state[bookshelf.shelf].length }) </h5> 
										<div className='scroll'>
											{this.state[bookshelf.shelf].map((item, index) => (
												<Draggable
													key={item.id ? item.id : item.title}
													draggableId={item.id ? item.id : item.title}
													index={index}>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															className='d-flex bookshelf-item align-items-center'
														>
															<button onClick={() => this.deleteBook(bookshelf.shelf, index)}  className='delete-button' >
																<TiDelete  size={20} fill='#ac3333'/>
															</button>
															<a href={item.url} className='link-button' target='_black' >
																<TiLink  size={20} fill='purple'/>
															</a>
															<img src={item.image[0]} alt='book-cover' />
															<h5> { item.title } </h5>
														</div>
													)}
												</Draggable>
											))}
										</div>
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						))}
					</DragDropContext>
				</div>
				<Modal
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })}
				>
					<RegisterBook
						onSubmit={(url) => this.addBook(url)}
						onClose={() => this.setState({ showModal: false })}
					/>
				</Modal>

			</Container>
		)
	}
}

export default App;
