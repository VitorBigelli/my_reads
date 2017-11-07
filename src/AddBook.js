import React, { Component } from 'react' 

class AddBook extends Component {
	
	render() {
		return (
			<div className="add-book-form-container">
				<form>
					<input 
						type='text' 
						placeholder='Title'
					></input>
					<input 
						type='text' 
						placeholder='Author'
					></input>

					<button type='submit'> Add Book </button>
				</form>
			</div>

		)
	}


}

export default AddBook