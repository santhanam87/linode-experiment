import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_BOOK = gql`
	mutation AddBook($title: String!, $author: String!) {
		addBook(title: $title, author: $author) {
			title
			author
		}
	}
`;

const AddBook = () => {
	const [title, setBookTitle] = useState('');
	const [author, setAuthorName] = useState('');
	const [addTodo, { data }] = useMutation(ADD_BOOK);

	const onBookTitleChange = ({ target: { value } }) => {
		setBookTitle(value);
	};

	const onAuthorNameChange = ({ target: { value } }) => {
		setAuthorName(value);
	};

	const addNewBook = () => {
		addTodo({ variables: { title, author } });
	};

	return (
		<form>
			<div className="formGroup">
				<label>Book Title</label>
				<input type="text" onChange={onBookTitleChange} value={title} />
			</div>
			<div className="formGroup">
				<label>Author Name</label>
				<input type="text" onChange={onAuthorNameChange} value={author} />
			</div>
			<button type="button" onClick={addNewBook}>
				Add
			</button>
		</form>
	);
};

export default AddBook;
