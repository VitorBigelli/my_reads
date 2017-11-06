import React, { Component } from 'react'

class Bookcase extends Component {

	render() {
		const { bookcase, books, onChangeBookcase } = this.props


		return (
			books.map( (book) => {
				<div> 
					{book}
				</div>
			})
		)
	}
}

export default Bookcase