import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class BooksSearch extends Component {
	
	state = {
		query: ''
	}



	render() {
		const { query } = this.state		
		const { books, onBookcaseChange } = this.props

		console.log(books)

		return (
			<div className='books-search'>
				<div className='books-search-header'>
					
					<Link to='/' className='my-reads-link'>
						Back
					</Link>
					
					<input
						type='text'
						value={query}
						placeholder='Search a book'
					></input>

				</div>

				<ul className='bookcase-list'>
					{ books.map( (book) => (
						<Book key={book.id} book={book} onBookcaseChange={ (prevBookcase, newBookcase, bookId) => onBookcaseChange(prevBookcase, newBookcase, bookId) } />
					
					))}
				</ul>

			</div>
		)
	}

}

export default BooksSearch