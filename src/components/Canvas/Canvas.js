import useEventListener from '@use-it/event-listener';
import React, { useEffect, useRef, useState } from 'react';

import styles from './styles/Canvas.module.css';

export default function Canvas(props) {
	const canvasRef = useRef(props.forwardedRef);
	const [ctx, setCtx] = useState();
	const cellSize = useRef(null);
	const isMobile = window.matchMedia(
		'only screen and (max-width: 760px)'
	).matches;

	const darkColors = {
		conductor: '#e0c134',
		head: '#4d38c4',
		tail: '#b93542',
		background: '#312f2f',
		sub_line: '#9d9c9c',
	};
	const lightColors = {
		conductor: '#f9f348',
		head: '#6248f9',
		tail: '#f9485a',
		background: '#fff',
		sub_line: '#676767',
	};

	let colors = lightColors;
	if (props.theme === 'theme-dark') {
		colors = darkColors;
	}

	//-------COMPONENT CHANGES----------------

	useEventListener('keydown', props.onKeyPress);

	useEffect(() => {
		if (!ctx) {
			setCtx(canvasRef.current.current.getContext('2d'));
		}

		cellSize.current = canvasRef.current.current.width / props.size;
		if (props.theme !== localStorage.getItem('theme')) {
			if (localStorage.getItem('theme') === 'theme-dark') {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				colors = darkColors;
			} else {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				colors = lightColors;
			}
		}
		if (ctx) {
			resetCanvas();
			updateView();
		}
	}, [ctx, props.theme, props.size, props.grid]);

	//-------CANVAS FUNCTIONS----------------

	const setBackground = (color1, color2) => {
		ctx.fillStyle = color1;
		ctx.strokeStyle = color2;
		ctx.lineWidth = 3;
		ctx.clearRect(
			0,
			0,
			canvasRef.current.current.width,
			canvasRef.current.current.height
		);
		ctx.fillRect(
			0,
			0,
			canvasRef.current.current.height,
			canvasRef.current.current.width
		);

		for (
			let x = 1;
			x < canvasRef.current.current.width;
			x += cellSize.current
		) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvasRef.current.current.height);
		}
		for (
			let y = 1;
			y < canvasRef.current.current.height;
			y += cellSize.current
		) {
			ctx.moveTo(0, y);
			ctx.lineTo(canvasRef.current.current.width, y);
		}

		ctx.stroke();
	};
	const drawSquare = (x, y, color, isHover = false) => {
		ctx.fillStyle = color;
		ctx.globalAlpha = isHover ? 0.5 : 1.0;
		ctx.fillRect(
			x * cellSize.current + 2.25,
			y * cellSize.current + 2.25,
			cellSize.current - 3,
			cellSize.current - 3
		);
		ctx.globalAlpha = 1;
	};
	const resetCanvas = () => {
		ctx.beginPath();
		setBackground(colors.background, colors.sub_line);
	};
	const updateView = () => {
		for (let i = 0; i < props.size; i++) {
			for (let j = 0; j < props.size; j++) {
				switch (props.grid[i][j]) {
					case 1:
						drawSquare(j, i, colors.head);
						break;
					case 2:
						drawSquare(j, i, colors.tail);
						break;
					case 3:
						drawSquare(j, i, colors.conductor);
						break;
					default:
						break;
				}
			}
		}
	};

	//-------CLICK FUNCTIONS----------------

	const pointerUpEvent = (e) => {
		let saveFullGrid = JSON.stringify(props.fullGrid);
		let copySaveArray = JSON.parse(JSON.stringify(props.saveArray));
		copySaveArray[props.strokeCount] = saveFullGrid;
		if (props.strokeCount - 1 < copySaveArray.length - 1) {
			copySaveArray.length = props.strokeCount + 1;
			props.setDisableRedo(true);
		}
		props.setSaveArray(copySaveArray);
		props.setDisableUndo(false);
		props.setStrokeCount((prev) => prev + 1);
	};

	const clickCell = (e) => {
		let x = Math.floor(e.nativeEvent.offsetX / (cellSize.current / 3));
		let y = Math.floor(e.nativeEvent.offsetY / (cellSize.current / 3));
		switch (props.currClickValue) {
			case '0':
				break;
			case '1':
				drawSquare(x, y, colors.head);
				break;
			case '2':
				drawSquare(x, y, colors.tail);
				break;
			case '3':
				drawSquare(x, y, colors.conductor);
				break;
			default:
				drawSquare(x, y, colors.conductor);
		}
		props.updateGrid(y, x, Number(props.currClickValue));
	};

	const clickMoveCell = (e) => {
		if (e.pressure <= 0) {
			let x = Math.floor(e.nativeEvent.offsetX / (cellSize.current / 3));
			let y = Math.floor(e.nativeEvent.offsetY / (cellSize.current / 3));
			resetCanvas();
			updateView();
			switch (props.currClickValue) {
				case '0':
					drawSquare(x, y, colors.background, true);
					break;
				case '1':
					drawSquare(x, y, colors.head, true);
					break;
				case '2':
					drawSquare(x, y, colors.tail, true);
					break;
				case '3':
					drawSquare(x, y, colors.conductor, true);
					break;
				default:
					drawSquare(x, y, colors.conductor, true);
			}
		} else {
			let x = Math.floor(e.nativeEvent.offsetX / (cellSize.current / 3));
			let y = Math.floor(e.nativeEvent.offsetY / (cellSize.current / 3));
			switch (props.currClickValue) {
				case '0':
					break;
				case '1':
					drawSquare(x, y, colors.head);
					break;
				case '2':
					drawSquare(x, y, colors.tail);
					break;
				case '3':
					drawSquare(x, y, colors.conductor);
					break;
				default:
					drawSquare(x, y, colors.conductor);
			}
			props.updateGrid(y, x, Number(props.currClickValue));
		}
	};

	return (
		<canvas
			ref={props.forwardedRef}
			onClick={(el) => clickCell(el)}
			onPointerMove={(el) => clickMoveCell(el)}
			className={styles.canvas}
			width={
				!isMobile ? window.innerHeight * 0.73 * 3 : window.innerWidth * 0.98 * 3
			}
			height={
				!isMobile ? window.innerHeight * 0.73 * 3 : window.innerWidth * 0.98 * 3
			}
			onPointerUp={(e) => pointerUpEvent(e)}
		/>
	);
}
