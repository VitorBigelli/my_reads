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
			<div> 
				<Link to='/manage' className='my-reads-link'>
					Back
				</Link>
				<div className='add-book-form-container'>
					
					<form className='add-book-form' onSubmit={ event => this.handleSubmit(event)}>
						<ImageInput 
							className='new-book-cover'
							name="cover"
							maxHeight={200}
						/>
						<p> Title: <input 
							type="text"
							name="title"
							className="new-book-title"
						/></p>
						<p> Author: <input 
							type="text"
							name="author"
							className="new-book-author"
						/></p>
						<button 
							type="submit"
						>Register</button>

					</form>
				</div>
			</div>
		)
	}
}

export default RegisterBook;