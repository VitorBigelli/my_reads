import React, { Component } from 'react';
import sortBy from 'sort-by';

const Bookcase = ( { books, title = '', onChangeBookcase} ) => {

	const bookcaseBooks = title ? books.filter( _ => _.status === title) : books
	bookcaseBooks.sort(sortBy('title'))

	return (		

		<div className="bookcase-content">
			<h3> {title} </h3>
			<ul className="bookcase-list">
			{ bookcaseBooks.map( (book) => (
				<li 
					key={book.id}
					className="bookcase-list-item"
				>
					<img 
						src={book.imageLinks.thumbnail}
						className='book-cover-image'
						height={200}
					/>
					<p className="book-title"> {book.title} </p>
					<p className="book-author"> {book.authors[0]} </p>

					<select 
						defaultValue={book.status} 
						className="bookcase-control"
						onChange={ (event) => onChangeBookcase(event, book) }
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


export default Bookcase