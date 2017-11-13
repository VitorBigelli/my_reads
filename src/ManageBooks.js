import React, { Component } from 'react'; 
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';
import { Link } from 'react-router-dom';

class ManageBooks extends Component{
	
	handleSubmit = (event, book) => {
		event.preventDefault()

		const values = serializeForm(event.target, { hash: true})

		if (this.props.updateBook) {
			this.props.updateBook(values, book)
		}
	}

	render() {
		const { books, updateBook, deleteBook, restoreDefault } = this.props

		return (
			<div> 
				<Link to='/' className='my-reads-link'>
					Back
				</Link>
				<ul>
					{ books.map( (book) => (
						<li key={book.id} className="edit-book-form-container">
							<form 
								className="edit-book-form"
								onSubmit={event => this.handleSubmit(event, book)}>
								<img 
									src={book.imageLinks.thumbnail}
									className="edit-book-cover"
									name="currentCover"
									maxHeight={100}
								/>
								<p> Title: <input 
									type="text"
									defaultValue={book.title}
									name="title"
									className="edit-book-title"
								/></p>
								
								<p> Author: <input 
									type="text"
									defaultValue={book.authors[0]}
									name="author"
									className="edit-book-title"
								/> </p>
								<div className="manage-options">
									<button 
										type="submit"
									> Save changes </button>
									<button
										onClick={() => deleteBook(book.id)}> Delete book </button>
								</div>
							</form>
						</li>
					))

					}

				</ul>
			</div>
		)
	}

}

export default ManageBooks;