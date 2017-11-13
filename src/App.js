import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BooksSearch from './BooksSearch';
import Bookcase from './Bookcase';
import './App.css';
import RegisterBook from './RegisterBook';
import ManageBooks from './ManageBooks';

class App extends Component {

	state = {
		books: []
	}

	componentDidMount() {

		const cachedBooks = localStorage.getItem('myReads');

		console.log(cachedBooks)

		if (cachedBooks) {
			this.setState( { books: JSON.parse(cachedBooks) } );
			return;
		} 

		BooksAPI.getAll().then( (books) => {
			books.map( book => book.status = 'None')
			localStorage.setItem('myReads', JSON.stringify(books))
			this.setState( { books } )
		})
	
	
	}

	registerBook = ({ title, author, cover}) => {

		const book = {
			id: this.state.length + 1,
			title: title, 
			authors: [author],
			imageLinks: {
				thumbnail: cover
			} 
		}

		localStorage.setItem('myReads', JSON.stringify(this.state.books.concat([book])))
		this.setState( {
			books: JSON.parse(localStorage.getItem('myReads'))
		})
	}

	updateBook = (values, book) => {
		const { title, author, cover} = values
		
		if (!cover) {
			const cover = book.imageLinks.thumbnail
		}

		const filteredBooks = this.state.books.filter( _ => (_.id !== book.id) )
		const updatedBook = {
			title: title, 
			authors: [author],
			imageLinks: {
				thumbnail: cover
			},
			status: book.status
		}
		const newBooks = filteredBooks.concat( [ updatedBook ]);
		localStorage.setItem('myReads', JSON.stringify(newBooks))

		this.setState( {
			books: newBooks
		})
	}

	deleteBook = (bookId) => {
		const filteredBooks = this.state.books.filter( _ => _.id !== bookId)
		localStorage.setItem('myReads', JSON.stringify(filteredBooks))
		this.setState( {
			books: filteredBooks
		})
		
	}

	onChangeBookcase = (event, book) => {
		event.preventDefault() 
		const filteredBooks = this.state.books.filter( _ => (_.id !== book.id))
		book.status = event.target.value 
		localStorage.setItem('myReads', JSON.stringify(filteredBooks.concat( [ book ])))
		this.setState( {
			books: filteredBooks.concat( [ book ] )
		})
	}

	render() {
		const { books } = this.state

		const bookcases = [
			{ title: 'Currently Reading', books }, 
			{ title: 'Want to Read', books }, 
			{ title: 'Read', books }
		]

		return (
		  <div className="App">
		    
		    <Route exact path='/' render={ () => (
		    	<div className='bookcases'>
		    		
		    		<h2 className='my-reads-header'> My reads </h2>

		    		{ bookcases.map( bookcase => (
		    			<Bookcase
		    				key={bookcase.title} 
		    				title={bookcase.title}
		    				books={bookcase.books}
		    				onChangeBookcase={ (event, book) => this.onChangeBookcase(event, book)}
		    			/>
		    		))}

		    		<Link to='/search' className='books-search-link' />
		    		<Link to='/register' className='books-register' />
		    		<div>"Add book" icon made by <a href="https://www.flaticon.com/authors/picol" title="Picol">Picol</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


		    	</div>
		    )}/>

		    <Route exact path='/search' render={ () => (
   				<BooksSearch 
   					books={books} 
   					onChangeBookcase={ (event, book) => this.onChangeBookcase(event, book) }
   				/>
		    )}/>

		    <Route exact path='/register' render={ ({history}) => (
		    	<RegisterBook onSubmit={ values => {
		    		this.registerBook(values)
		    		history.push('/')
		    	}} />
		    	)}
		    />

		    <Route exact path='/manage' render={ () => (
		    	<ManageBooks 
		    		books={books}
		    		updateBook={ (values, book) => this.updateBook(values, book) }
		    		deleteBook={ (book) => this.deleteBook(book)}
		    		restoreDefault={this.restoreDefault}
		    	/>

		    	)}
		    />
		  </div>
		)
	}
}

export default App;
