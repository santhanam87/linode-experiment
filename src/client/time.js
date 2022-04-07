import React from 'react';
import { useQuery } from '@apollo/client';
import BooksQuery from '../queries/books.graphql';

function TimeComponent() {
  const { loading, error, data } = useQuery(BooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.books.map(({ title, author }) => (
    <div key={title}>
      <p>
        {author}
        {title}
      </p>
    </div>
  ));
}

export default TimeComponent;
