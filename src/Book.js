import React, { Component } from 'react';

class Book extends Component {

	state = {
		bookcase: 'none'
	}

	render() {
		const { book, onChangeBookcase } = this.props

		console.log(book)

		return (
			<li key={book.title} className='bookcase-list-item'>
				<img 
					src={book.imageLinks.thumbnail}
					height={200}
					alt='book-cover'
				></img>
				<p> { book.title } </p>	
				<p> { book.authors[0] } </p>

				<select 
					defaultValue={this.state.bookcase} 
					className='bookcase-control'
					onChange={ (event) => this.setState({ bookcase: event.target.value})} 
					onChange={ (event) => onChangeBookcase(book.id, event.target.value, this.state.bookcase)} 
				>	
					<option value='none' > None </option>
					<option value='currentlyReading' > Currently reading </option>
					<option value='wantToRead' > Want to read </option>
					<option value='read' > Read </option>
				
				</select>

			</li>
		)
	}
}

export default Book;