import React, { Component } from 'react';

class Book extends Component {
	state = {
		bookcase: 'none'
	}

	updateBookcase = (bookcase, bookId) => (
		this.setState( {bookcase: bookcase})
	)

	render() {
		const { book, onBookcaseChange } = this.props


		return (
			<li key={book.title} className='bookcase-list-item'>
				<img 
					src={book.imageLinks.thumbnail}
					height={200}
				></img>
				<p> { book.title } </p>	
				<p> { book.authors[0] } </p>

				<select defaultValue={this.state.bookcase} className='bookcase-control' onChange={ (event) => ( 
						onBookcaseChange(this.state.bookcase, event.target.value, book.id),
						this.setState({bookcase: event.target.value}) 	
				)}>	
					<option value='books'>None</option>
					<option value='currentlyReading'>Currently reading</option>
					<option value='wantToRead'>Want to read</option>
					<option value='read'>Read</option>
				</select>

			</li>
		)
	}
}

export default Book;