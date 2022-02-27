import React from 'react';
import { useQuery, gql } from '@apollo/client';
const EXCHANGE_RATES = gql`
	query GetBooks {
		books {
			title
			author
		}
	}
`;

const TimeComponent = () => {
	const { loading, error, data } = useQuery(EXCHANGE_RATES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	return data.books.map(({ title, author }) => (
		<div key={title}>
			<p>
				{title}: {author}
			</p>
		</div>
	));
};

export default TimeComponent;
