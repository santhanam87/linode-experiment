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

function AddBook() {
  const [title, setBookTitle] = useState('');
  const [author, setAuthorName] = useState('');
  const [addTodo] = useMutation(ADD_BOOK);

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
        <label htmlFor="bookName">
          Book Title
          <input
            name="bookName"
            type="text"
            onChange={onBookTitleChange}
            value={title}
          />
        </label>
      </div>
      <div className="formGroup">
        <label htmlFor="authorName">
          Author Name
          <input
            type="text"
            name="authorName"
            onChange={onAuthorNameChange}
            value={author}
          />
        </label>
      </div>
      <button type="button" onClick={addNewBook}>
        Add
      </button>
    </form>
  );
}

export default AddBook;
