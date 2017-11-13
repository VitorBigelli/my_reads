import React, { Component } from 'react';
import sortBy from 'sort-by';

const Bookshelf = ( { books, title = '', onChangeBookshelf} ) => {

	const bookshelfBooks = title ? books.filter( _ => _.status === title) : books
	bookshelfBooks.sort(sortBy('title'))

	return (		

		<div className="bookshelf-content">
			<h3> {title} </h3>
			<ul className="bookshelf-list">
			{ bookshelfBooks.map( (book) => (
				<li 
					key={book.id}
					className="bookshelf-list-item"
				>
					<img 
						src={book.imageLinks.thumbnail}
						className='book-cover-image'
						height={200}
						alt='book-cover'
					/>
					<p className="book-title"> {book.title} </p>
					<p className="book-author"> {book.authors[0]} </p>

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


export default Bookshelf