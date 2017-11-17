import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('get all books', () => {
	App.getAllBooks();
});

it('update a book', () => {
	App.updateBook({title, author})
});