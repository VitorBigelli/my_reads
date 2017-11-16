import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './utils/BooksAPI';

class BooksSearch extends Component {
	
	constructor(props) {
		super(props); 
		this.state = { query: '', books: [] }

	}

	updateQuery = (query) => {
		BooksAPI.search(query, 5).then( (books) => {
			this.setState( {
				query: query, 
				books: books
			})
		})
	}

	render() {
		const { query, books } = this.state		
		const { onChangeBookshelf } = this.props

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

					<Bookshelf 
						books={books}
						onChangeBookshelf={ (event, book) => onChangeBookshelf(event, book)} 
					/>			

			</div>
		)
	}

}

export default BooksSearch