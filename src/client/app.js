import React, { useState } from 'react';
import TimeComponent from './time';
import AddBook from './addBook';
function App() {
	const [currentState, setState] = useState(false);
	return (
		<div>
			<p>Hello world... from react</p>
			{currentState && <TimeComponent />}
			<button
				type="button"
				onClick={() => {
					setState(!currentState);
				}}
			>
				Load
			</button>
		</div>
	);
}

export default App;
