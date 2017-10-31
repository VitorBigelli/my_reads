import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookcase from './Bookcase'

class BooksSearch extends Component {
	
	state = {
		query: ''
	}

	render() {
		const { query } = this.state		
		const { books, onBookcaseChange } = this.props

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

				<Bookcase books={books} />

			</div>
		)
	}

}

export default BooksSearch