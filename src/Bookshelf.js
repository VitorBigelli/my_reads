import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by'

const Bookshelf = ( { loading, query = '', books, title = '', shelf = '', onChangeBookshelf} ) => {

	let bookshelfBooks = []

	if (!shelf) {
		bookshelfBooks = query ? books.sort(sortBy('title')) : [] 
	} else {
		bookshelfBooks = books.filter( _ => _.shelf === shelf ).sort(sortBy('title'))
	}

	return (		

		<div className="bookshelf-content">
			{ loading && 
				<div className="no-results"> Searching... </div>
			}
			{ !loading && query && !bookshelfBooks.length && 
				<div className="no-results"> No result found </div>
			}
			<h3> {title} </h3>
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


			</ul>
		</div>
	)
}

Bookshelf.propTypes = {
	books: PropTypes.array,
	loading: PropTypes.boolean,
	query: PropTypes.string,
	title: PropTypes.string,
	shelf: PropTypes.string, 
	onChangeBookshelf: PropTypes.function

}

export default Bookshelf