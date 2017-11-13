import React, { Component } from 'react';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';
import { Link } from 'react-router-dom';

class RegisterBook extends Component{
	
	handleSubmit = (e) => {
		e.preventDefault()

		const values = serializeForm(e.target, {hash: true})

		if (this.props.onSubmit) {
			this.props.onSubmit(values)
		}
	}

	render() {
		return (
			<div className='add-book-form-container'>
				<Link to='/' className='my-reads-link'>
					Back
				</Link>
				<form className='add-book-form' onSubmit={ event => this.handleSubmit(event)}>
					<ImageInput 
						className='new-book-cover'
						name="cover"
						maxHeight={200}
					/>
					<input 
						type="text"
						name="title"
						className="new-book-title"
					/>
					<input 
						type="text"
						name="author"
						className="new-book-author"
					/>
					<button 
						type="submit"
					>Register</button>
				</form>
			</div>
		)
	}
}

export default RegisterBook;