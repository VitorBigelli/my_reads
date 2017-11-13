import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import Bookcase from './Bookcase';

class BooksSearch extends Component {
	
	state = {
		query: ''
	}

	updateQuery = (query) => (
		this.setState( { query: query } )
	)

	render() {
		const { query } = this.state		
		const { books, onChangeBookcase } = this.props

		let showingBooks

		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			showingBooks = books.filter( (book) => ( match.test(book.title) || match.test(book.authors[0])))
		} else {
			showingBooks = []
		}

		console.log(showingBooks)

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

					<Bookcase 
						books={showingBooks}
						onChangeBookcase={ (event, book) => onChangeBookcase(event, book)} 
					/>			

			</div>
		)
	}

}

export default BooksSearch