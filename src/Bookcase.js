import React, { Component } from 'react';

class Bookcase extends Component {
	
	state = {
		bookcase: this.props.bookcase
	}

	render() {
		return(

			<ul className='bookcase-list'>

			</ul>
		)
	}


}

export default Bookcase;