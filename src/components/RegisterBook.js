import React, { useState } from 'react';
import { ReactTinyLink } from 'react-tiny-link'
import { InputGroup, Modal, Button, FormControl } from 'react-bootstrap';
import { validURL } from '../utils/helpers'

const RegisterBook = ({ onSubmit, onClose }) => {

	const [ link, updateLink ] = useState('')
	const [ response, updateResponse ] = useState(null)
	
	const handleSubmit = () => {
		console.log(response)
		onSubmit(response)
	} 


	return (
		<>
			<Modal.Header closeButton >
				<Modal.Title>Add Book</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup>
					<FormControl placeholder='Amazon url' value={link} onChange={ (e) => updateLink(e.target.value) }/>
				</InputGroup>
			</Modal.Body>


			{ validURL(link) ? <ReactTinyLink
				cardSize="small"
				showGraphic={true}
				maxLine={2}
				minLine={1}
				onSuccess={ (response) => updateResponse(response)}
				url={link}
			/> : (link && <p className='alert'> URL inválida </p>)}

			<Modal.Footer>
				<Button variant="secondary" onClick={ () => onClose()} >Close</Button>
				<Button disabled={!link || !validURL(link)} variant="primary" onClick={ () => handleSubmit()} >Save</Button>
			</Modal.Footer>
		</>
	)
}

export default RegisterBook;