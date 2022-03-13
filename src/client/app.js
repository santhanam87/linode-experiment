import React, { useState } from 'react';
import TimeComponent from './time';
import AddBook from './addBook';
function App() {
	const [currentState, setState] = useState(false);
	const [showAddBook, showHideAddBook] = useState(false);
	return (
		<div>
			<AddBook />
		</div>
	);
}

export default App;
