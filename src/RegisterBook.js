import React from 'react';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';
import { Link } from 'react-router-dom';

const RegisterBook = ({onSubmit}) => {
	
	const handleSubmit = (e) => {
		e.preventDefault()

		const values = serializeForm(e.target, {hash: true})

		if (onSubmit) {
			onSubmit(values)
		}
	}

		return (
			<div> 
				<Link to='/manage' className='my-reads-link'>
					Back
				</Link>
				<div className='add-book-form-container'>
					
					<form className='add-book-form' onSubmit={ event => handleSubmit(event)}>
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
						<p> Shelf:   
						<select name="shelf" className="new-book-shelf">
							<option value="currentlyReading"> Currently Reading </option>
							<option value="wantToRead"> Want to Read</option>
							<option value="read"> Read </option>
						</select>
						</p>
						<button 
							type="submit"
						>Register</button>

					</form>
				</div>
			</div>
		)
	}

export default RegisterBook;