import React from 'react';
import { useSpring, animated } from 'react-spring';

const properties = {
	play: {
		opacity: 1,
		points: [5, 3, 19, 12, 5, 21, 5, 3],
	},
	pause: {
		opacity: 0,
		points: [20, 3, 20, 20, 5, 20, 5, 3],
	},
};
export default function PlayIconComp({ className, isStart }) {
	const currProps = properties[isStart ? 'pause' : 'play'];
	let opacity = currProps.opacity;

	const opacityPauseProps = useSpring({ opacity: Math.abs(opacity - 1) });
	const opacityPlayProps = useSpring({ opacity });
	const { points } = useSpring({ points: currProps.points });

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
			<animated.g style={{ ...opacityPlayProps }}>
				<animated.polygon points={points}></animated.polygon>
			</animated.g>
			{/* <polygon points="5 3 19 12 5 21 5 3"></polygon> */}
			<animated.g style={{ ...opacityPauseProps }}>
				<rect x="4" y="4" width="5" height="16"></rect>
				<rect x="14" y="4" width="5" height="16"></rect>
			</animated.g>
		</svg>
	);
}
