import React, { Component } from 'react'; 
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';
import { Link } from 'react-router-dom';

const ManageBooks = (props) => {
	
	const handleSubmit = (event, book) => {
		event.preventDefault()

		const values = serializeForm(event.target, { hash: true})

		if (props.updateBook) {
			props.updateBook(values, book)
		}
	}

		const { books, updateBook, deleteBook, restoreDefault } = props

		return (
			<div> 
				<Link to='/' className='my-reads-link'>
					Back
				</Link>
	    		<Link to='/register' className='books-register'/>

				<ul className="manage-books-list">
					{ books.map( (book) => (
						<li key={book.id} className="edit-book-form-container">
							<form 
								className="edit-book-form"
								onSubmit={event => handleSubmit(event, book)}>
								<img 
									src={book.imageLinks.thumbnail}
									className="edit-book-cover"
									name="currentCover"
									height={100}
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
										className='delete-book'
										onClick={() => deleteBook(book.id)}> Delete book </button>
								</div>
							</form>
						</li>
					))

					}

				</ul>

				<footer className="manage-books-footer">
					<button 
						onClick={() => restoreDefault()}
					>
					Restore default
					</button>
				</footer>
			</div>
		)
}

export default ManageBooks;