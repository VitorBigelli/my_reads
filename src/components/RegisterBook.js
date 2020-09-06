import React, { useState, useEffect } from 'react';
import { ReactTinyLink } from 'react-tiny-link'
import { InputGroup, Modal, Button, FormControl, Form, Accordion } from 'react-bootstrap';
import { validURL } from '../utils/helpers'
import { useAccordionToggle } from 'react-bootstrap/Accordion'

const RegisterBook = ({ onSubmit, onClose }) => {

	const [ link, updateLink ] = useState('https://www.amazon.com/Sapiens-breve-hist%C3%B3ria-humanidade-Portuguese-ebook/dp/B00UZLPCGQ')
	const [ response, updateResponse ] = useState(null) 
	const [ title, updateTitle ] = useState('')
	const [ loading, toggleLoading ] = useState(false)
	
	const handleSubmit = () => {
		response.url = link 
		response.title = title 
		onSubmit(response)
	} 

	const onSuccess = (response) => {  
		updateTitle(response.title) 
		updateResponse(response)
		toggleLoading(false)
	} 

	useEffect( () => {
		if (validURL(link) && !response) {
			toggleLoading(true)
		} 
	})

	return (
		<>
			<Modal.Header closeButton >
				<Modal.Title>Add Book</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup>
					<FormControl placeholder='Amazon url' value={link} onChange={ (e) => updateLink(e.target.value) }/>
				</InputGroup>
				{ response && 
					<div className='d-flex flex-column justify-content-center align-items-center book-preview'>
						<img src={response.image[0]} className='' /> 
						<InputGroup className='d-flex'>
							<Form.Control className='title-input' placeholder='' value={title} onChange={ (e) => updateTitle(e.target.value) }/>
						</InputGroup>				
					</div>
				}
			</Modal.Body>

			{ loading && <p className='text-center'> Loading data...</p>}
			{ validURL(link) ?
				<ReactTinyLink
					maxLine={2}
					minLine={1}
					onSuccess={ (response) => onSuccess(response)}
					url={link}
					style={{
						display: 'none !important' 
					}}
				/> : link ? <p className='text-center'>Invalid URL</p> : null
			}

			<Modal.Footer>
				<Button variant="secondary" onClick={ () => onClose()} >Close</Button>
				<Button disabled={!link || !validURL(link)} variant="primary" onClick={ () => handleSubmit()} >Save</Button>
			</Modal.Footer>
		</>
	)
}

export default RegisterBook;