import React from 'react';
import ImageInput from './ImageInput';

const RegisterBook = () => {
	return (
		<form>
			<ImageInput 
				className='new-book-cover'
				name="bookCover"
				maxHeight={200}
			/>
			<input 
				type="text"
				className="new-book-title"
			/>
			<input 
				type="text"
				className="new-book-author"
			/>
			<button 
				type="submit"
			>Register</button>
		</form>

	)

}

export default RegisterBook;