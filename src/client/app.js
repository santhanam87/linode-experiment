import React, { useState } from 'react';
import TimeComponent from './time';
import AddBook from './addBook';
function App() {
	const [currentState, setState] = useState(false);
	const [showAddBook, showHideAddBook] = useState(false);
	return (
		<div>
			{currentState && <TimeComponent />}
			<button
				type="button"
				onClick={() => {
					setState(!currentState);
				}}
			>
				Load Books
			</button>
			{showAddBook && <AddBook />}
			<button
				type="button"
				onClick={() => {
					showHideAddBook(!showAddBook);
				}}
			>
				Add New
			</button>
		</div>
	);
}

export default App;
