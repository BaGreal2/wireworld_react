import React from 'react';
import { useSpring, animated } from 'react-spring';

const properties = {
	plus: {
		y1: 3,
		y2: 21,
	},
	minus: {
		y1: 12,
		y2: 12,
	},
};

export default function AnimatedPlusMinusIconComp({
	className,
	isOpened = false,
}) {
	const { y1, y2 } = properties[isOpened ? 'minus' : 'plus'];
	const y1Props = useSpring({ y1 });
	const y2Props = useSpring({ y2 });
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<animated.g>
				<animated.line
					x1="12"
					y1={y1Props.y1}
					x2="12"
					y2={y2Props.y2}
				></animated.line>
			</animated.g>
			<line x1="3" y1="12" x2="21" y2="12"></line>
		</svg>
	);
}
