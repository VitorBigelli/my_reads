import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import BooksSearch from './BooksSearch';
import Bookcase from './Bookcase';
import './App.css';
import RegisterBook from './RegisterBook';

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

	registerBook = ( title, author, cover) => {
		const book = {
			id: this.state.length + 1,
			title: title, 
			authors: [author],
			imageLinks: {
				thumbnail: cover
			} 
		}

		localStorage.setItem('myread', JSON.stringify(this.state.books.concat([book])))
		this.setState( {
			books: JSON.parse(localStorage.getItem('myReads'))
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

		    		<div>"Add book" icon made by <a href="https://www.flaticon.com/authors/picol" title="Picol">Picol</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

		    	</div>
		    )}/>

		    <Route exact path='/search' render={ () => (
   				<BooksSearch 
   					books={books} 
   					onChangeBookcase={ (event, book) => this.onChangeBookcase(event, book) }
   				/>
		    )}/>

		    <Route exact path='/register' render={ () => (
		    	<RegisterBook />
		    	)}
		    />
		    
		  </div>
		)
	}
}

export default App;
