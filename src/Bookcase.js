import React, { Component } from 'react'

class Bookcase extends Component {

	state = {
		name: this.props.bookcase
	}

	render() {
		const { bookcase, books } = this.props

		return (
			books.map( (book) => (
				book
			))
		)
	}
}

export default Bookcase