import React, { Component } from 'react'

const Bookcase = ( { books, name} ) => {

	return (
		<ul className="bookcase-list">
		{ books.map( (book) => (
			<li className="bookcase-list-item">
				<img 
					src={book.imageLinks.thumbnail}
					className='book-cover-image'
				/>
				<p className="book-title"> {book.title} </p>
				<p className="book-author"> {book.authors[0]} </p>

				<select defaultvalue={book.status} className="bookcase-control">
					<option value='none' > None </option>
					<option value='currentlyReading' > Currently Reading </option>
					<option value='wantToRead' > Want to Read </option>
					<option value='read' > Read </option>
				</select>

			</li>	
		)) }

		</ul>
	)
}


export default Bookcase