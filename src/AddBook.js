import React, { Component } from 'react' 
import ImageInput from './ImageInput'

class AddBook extends Component {
	
	handleSubmit = (e) => {
		e.preventDefault() 

		const values = serializeForm(e.target, {hash: true})

		if (this.props.onAddBook) {
			this.props.onAddBook(values)
		}

	}

	render() {
		return (
			<div className="add-book-form-container">
				<form onSubmit={this.handleSubmit} >
					<ImageInput 
						className='add-book-image'
						name='bookCover'
						maxHeight={100}
					/>
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