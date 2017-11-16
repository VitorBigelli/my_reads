import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import Bookshelf from './Bookshelf';
import { Debounce } from 'react-throttle'

class BooksSearch extends Component {
	
	constructor(props) {
		super(props); 
		this.state = { query: '' }

	}

	updateQuery = (query) => {
		this.setState( {
			query: query
		})
		
		this.props.search(query)
	}

	render() {
		const { query } = this.state		
		const { onChangeBookshelf, books, loading } = this.props

		return (

			<div className='books-search'>

			    	<div className='books-search-header'>
						<Link to='/' className='my-reads-link'>
							Back
						</Link>
							<input
								type='text'
								value={query}
								placeholder='Search for a category, theme or field'
								onChange={ (event) => {		
									this.updateQuery(event.target.value)
								}}
							/>
					</div>

					<Bookshelf 
						loading={loading}
						query={query}
						books={books}
						onChangeBookshelf={ (event, book) => onChangeBookshelf(event, book)} 
					/>			

			</div>
		)
	}

}

export default BooksSearch