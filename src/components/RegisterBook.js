import React, { useState } from 'react';
import ImageInput from '../ImageInput';
import serializeForm from 'form-serialize';
import { InputGroup, Modal, Button, FormControl } from 'react-bootstrap';

const RegisterBook = ({ onSubmit }) => {

	const [ link, updateLink ] = useState('')
	
	const handleSubmit = () => {
		onSubmit(link)
	}

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Add Book</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup>
					<FormControl placeholder='Amazon url' value={link} onChange={ (e) => updateLink(e.target.value) }/>
				</InputGroup>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary">Close</Button>
				<Button variant="primary" onClick={ () => handleSubmit()}>Save</Button>
			</Modal.Footer>
		</>
	)
}

export default RegisterBook;