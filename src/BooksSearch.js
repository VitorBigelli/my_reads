import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import Book from './Book';

class BooksSearch extends Component {
	
	state = {
		query: ''
	}

	updateQuery = (query) => (
		this.setState( {query: query.trim()} )
	)

	render() {
		const { query } = this.state		
		const { books } = this.props

		let showingBooks

		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			console.log(books[0])
			showingBooks = books.filter( (book) => ( match.test(book.props.book.title) || match.test(book.props.book.authors[0])))
		} else {
			showingBooks = []
		}

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
							onChange={ (event) => (this.updateQuery(event.target.value))}
						></input>
					</div>

					<ul className='bookcase-list'>
						{showingBooks.map( (book) => ( 
							book
						))}
					</ul>
			
			</div>
		)
	}

}

export default BooksSearch