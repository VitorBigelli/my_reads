import React, { Component } from 'react';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';

const Bookshelf = ( { loading = false, query = '', books, title = '', shelf = '', onChangeBookshelf} ) => {

	let bookshelfBooks = []

	bookshelfBooks = title ? books.filter( _ => _.shelf === shelf ) : books 

	return (		

		<div className="bookshelf-content">
			<h3> {title} </h3>
			{ loading && 
				<div className='no-results'> Searching ... </div>
			}
			{ !loading && 
				<ul className="bookshelf-list">
				{ bookshelfBooks && bookshelfBooks.map( (book) => (
					<li 
						key={book.id}
						className="bookshelf-list-item"
					>
						<img 
							src={book.imageLinks ? book.imageLinks.thumbnail : "http://moziru.com/images/book-clipart-simple-1.png"}
							className='book-cover-image'
							height={200}
							alt='book-cover'
						/>
						<p className="book-title"> {book.title} </p>
						<p className="book-author"> {book.authors ? book.authors.join('; ') : '-'} </p>

						<select 
							defaultValue={book.shelf} 
							className="bookshelf-control"
							onChange={ (event) => onChangeBookshelf(event, book) }
						>
							<option value='None' > None </option>
							<option value='currentlyReading' > Currently Reading </option>
							<option value='wantToRead' > Want to Read </option>
							<option value='read' > Read </option>
						</select>

					</li>	
				)) }
				{ query && !bookshelfBooks.length &&
					<div className="no-results"> No results found </div>
				}
				</ul>
			}
		</div>
	)
}

Bookshelf.propTypes = {
	books: PropTypes.array
}

export default Bookshelf