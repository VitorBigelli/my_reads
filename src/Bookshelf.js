import React, { Component } from 'react';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';

const Bookshelf = ( { books, title = '', shelf = '', onChangeBookshelf} ) => {

	let bookshelfBooks = []

	!books.error && (bookshelfBooks = title ? books.filter( _ => _.shelf === shelf) : books) 

	console.log(bookshelfBooks)
	try {
		if (bookshelfBooks) {
			bookshelfBooks.sort(sortBy('title'))
		}
	}
	catch (bookshelfBooks) {
		bookshelfBooks = []
	}

	return (		

		<div className="bookshelf-content">
			<h3> {title} </h3>
			<ul className="bookshelf-list">
			{ bookshelfBooks && bookshelfBooks.map( (book) => (
				<li 
					key={book.id}
					className="bookshelf-list-item"
				>
					{console.log(book)}
					<img 
						src={book.imageLinks ? book.imageLinks.thumbnail : "http://moziru.com/images/book-clipart-simple-1.png"}
						className='book-cover-image'
						height={200}
						alt='book-cover'
					/>
					<p className="book-title"> {book.title} </p>
					<p className="book-author"> {book.authors ? book.authors[0] : '-'} </p>

					<select 
						defaultValue={book.status} 
						className="bookshelf-control"
						onChange={ (event) => onChangeBookshelf(event, book) }
					>
						<option value='None' > None </option>
						<option value='Currently Reading' > Currently Reading </option>
						<option value='Want to Read' > Want to Read </option>
						<option value='Read' > Read </option>
					</select>

				</li>	
			)) }
			</ul>
		</div>
	)
}

Bookshelf.propTypes = {
	books: PropTypes.array
}

export default Bookshelf