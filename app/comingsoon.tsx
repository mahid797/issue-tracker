// pages/index.js
import React from 'react';

const ComingSoonPage = () => {
	// Check if your app is in development mode (you can use process.env.NODE_ENV)
	const isDevelopment = process.env.NODE_ENV === 'development';

	if (isDevelopment) {
		return <div>Coming Soon!</div>;
	}

	// Render your actual app content here
	return <div>Your main app content</div>;
};

export default ComingSoonPage;
