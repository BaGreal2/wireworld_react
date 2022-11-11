import React from 'react';

export default function ClearIconComp({ className }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
			<line x1="9" y1="9" x2="15" y2="15"></line>
			<line x1="15" y1="9" x2="9" y2="15"></line>
		</svg>
	);
}
