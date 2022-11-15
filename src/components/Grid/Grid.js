import React, { useEffect, useState, useRef } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { Canvas } from '../Canvas';
import { UploadBtn } from '../UploadBtn';
import { UploadIcon } from '../../svg';

import styles from './styles/Grid.module.css';

export default function Grid(props) {
	const [size, setSize] = useState(props.size);
	const [grid, setGrid] = useState(props.grid);
	const [fullGrid, setFullGrid] = useState(props.fullGrid);
	// eslint-disable-next-line no-unused-vars
	const [clearGrid, setClearGrid] = useState(props.clearGrid);
	// eslint-disable-next-line no-unused-vars
	const [resetGrid, setResetGrid] = useState(props.resetGrid);
	const [offsetY, setOffsetY] = useState(props.offsetY);
	const [offsetX, setOffsetX] = useState(props.offsetX);
	const nextGrid = useRef(JSON.parse(JSON.stringify(grid)));
	const childCanvas = useRef(null);

	//-------GRID FUNCTIONS----------------

	const copyAndResetGrid = () => {
		let saveGrid = JSON.parse(JSON.stringify(nextGrid.current));
		let saveFullGrid = JSON.parse(JSON.stringify(fullGrid));
		let startIndexRow = (props.maxSize + 50 - size) / 2 - offsetY;
		let startIndexCol = (props.maxSize + 50 - size) / 2 - offsetX;
		let endIndexRow = startIndexRow + size;
		let endIndexCol = startIndexCol + size;
		for (let i = startIndexRow; i < endIndexRow; i++) {
			for (let j = startIndexCol; j < endIndexCol; j++) {
				saveFullGrid[i][j] =
					nextGrid.current[i - startIndexRow][j - startIndexCol];
			}
		}

		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				nextGrid.current[i][j] = 0;
			}
		}

		setFullGrid(JSON.parse(JSON.stringify(saveFullGrid)));
		setGrid(JSON.parse(JSON.stringify(saveGrid)));
	};

	const countNeighbors = (row, col) => {
		let count = 0;
		if (row - 1 >= 0) {
			if (grid[row - 1][col] === 1) count++;
		}
		if (row - 1 >= 0 && col - 1 >= 0) {
			if (grid[row - 1][col - 1] === 1) count++;
		}
		if (row - 1 >= 0 && col + 1 < size) {
			if (grid[row - 1][col + 1] === 1) count++;
		}
		if (col - 1 >= 0) {
			if (grid[row][col - 1] === 1) count++;
		}
		if (col + 1 < size) {
			if (grid[row][col + 1] === 1) count++;
		}
		if (row + 1 < size) {
			if (grid[row + 1][col] === 1) count++;
		}
		if (row + 1 < size && col - 1 >= 0) {
			if (grid[row + 1][col - 1] === 1) count++;
		}
		if (row + 1 < size && col + 1 < size) {
			if (grid[row + 1][col + 1] === 1) count++;
		}
		return count;
	};

	const applyRules = (row, col) => {
		let numNeighbors = countNeighbors(row, col);

		if (grid[row][col] === 1) {
			nextGrid.current[row][col] = 2;
		} else if (grid[row][col] === 2) {
			nextGrid.current[row][col] = 3;
		} else if (grid[row][col] === 3) {
			if (numNeighbors === 2 || numNeighbors === 1) {
				nextGrid.current[row][col] = 1;
			} else {
				nextGrid.current[row][col] = 3;
			}
		}
	};

	const play = () => {
		if (props.isStart) {
			for (let i = 0; i < size; i++) {
				for (let j = 0; j < size; j++) {
					applyRules(i, j);
				}
			}
			copyAndResetGrid();
		}
	};

	const clearGrids = () => {
		let saveGrid = JSON.parse(JSON.stringify(grid));
		let saveFullGrid = JSON.parse(JSON.stringify(fullGrid));
		for (let i = 0; i < props.maxSize + 50; i++) {
			for (let j = 0; j < props.maxSize + 50; j++) {
				if (i < size && j < size) {
					saveGrid[i][j] = 0;
					nextGrid.current[i][j] = 0;
				}
				saveFullGrid[i][j] = 0;
			}
		}
		setFullGrid(JSON.parse(JSON.stringify(saveFullGrid)));
		setGrid(JSON.parse(JSON.stringify(saveGrid)));
	};

	const setNewResGrid = (valueInt) => {
		if (valueInt >= 1 && valueInt <= props.maxSize + 50) {
			setSize(valueInt);
			if (props.isStart) {
				props.toggleStart();
			}
			let saveGrid = new Array(valueInt);
			for (let i = 0; i < valueInt; i++) {
				nextGrid.current[i] = new Array(valueInt);
				saveGrid[i] = new Array(valueInt);
			}
			for (let i = 0; i < valueInt; i++) {
				for (let j = 0; j < valueInt; j++) {
					saveGrid[i][j] =
						fullGrid[
							i +
								(size - valueInt) / 2 +
								(props.maxSize + 50 - size) / 2 -
								offsetY
						] !== undefined
							? fullGrid[
									i +
										(size - valueInt) / 2 +
										(props.maxSize + 50 - size) / 2 -
										offsetY
							  ][
									j +
										(size - valueInt) / 2 +
										(props.maxSize + 50 - size) / 2 -
										offsetX
							  ]
							: 0;
					nextGrid.current[i][j] = 0;
				}
			}
			setGrid(JSON.parse(JSON.stringify(saveGrid)));
		} else {
			setSize(size);
		}
	};

	//-------CLICK FUNCTIONS----------------

	const changeGridRes = (value) => {
		let valueInt = parseInt(value);
		if (valueInt % 2 !== 0) {
			if (valueInt < size) {
				valueInt = valueInt - 1;
			} else {
				valueInt = valueInt + 1;
			}
		}
		setNewResGrid(valueInt);
	};
	const incGridRes = () => {
		let valueInt = size + 2;
		setNewResGrid(valueInt);
	};
	const decGridRes = () => {
		let valueInt = size - 2;
		setNewResGrid(valueInt);
	};
	const shiftGrid = (shiftBy) => {
		let saveGrid = JSON.parse(JSON.stringify(grid));
		switch (shiftBy) {
			case 'up':
				for (let i = 0; i < size; i++) {
					for (let j = 0; j < size; j++) {
						if (
							fullGrid[i + 1 + (props.maxSize + 50 - size) / 2 - offsetY] !==
							undefined
						) {
							saveGrid[i][j] =
								fullGrid[i + 1 + (props.maxSize + 50 - size) / 2 - offsetY][
									j + (props.maxSize + 50 - size) / 2 - offsetX
								];
						} else {
							return;
						}
						nextGrid.current[i][j] = 0;
					}
				}
				setGrid(JSON.parse(JSON.stringify(saveGrid)));
				setOffsetY((prev) => prev - 1);
				break;
			case 'down':
				for (let i = 0; i < size; i++) {
					for (let j = 0; j < size; j++) {
						if (
							fullGrid[i - 1 + (props.maxSize + 50 - size) / 2 - offsetY] !==
							undefined
						) {
							saveGrid[i][j] =
								fullGrid[i - 1 + (props.maxSize + 50 - size) / 2 - offsetY][
									j + (props.maxSize + 50 - size) / 2 - offsetX
								];
						} else {
							return;
						}
						nextGrid.current[i][j] = 0;
					}
				}

				setOffsetY((prev) => prev + 1);
				setGrid(JSON.parse(JSON.stringify(saveGrid)));
				break;
			case 'left':
				for (let i = 0; i < size; i++) {
					for (let j = 0; j < size; j++) {
						if (
							fullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY] !==
							undefined
						) {
							saveGrid[i][j] =
								fullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY][
									j + 1 + (props.maxSize + 50 - size) / 2 - offsetX
								];
						} else {
							return;
						}

						nextGrid.current[i][j] = 0;
					}
				}
				setGrid(JSON.parse(JSON.stringify(saveGrid)));
				setOffsetX((prev) => prev - 1);
				break;
			case 'right':
				for (let i = 0; i < size; i++) {
					for (let j = 0; j < size; j++) {
						if (
							fullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY] !==
							undefined
						) {
							saveGrid[i][j] =
								fullGrid[i + (props.maxSize + 50 - size) / 2 - offsetY][
									j - 1 + (props.maxSize + 50 - size) / 2 - offsetX
								];
						} else {
							return;
						}

						nextGrid.current[i][j] = 0;
					}
				}
				setOffsetX((prev) => prev + 1);
				setGrid(JSON.parse(JSON.stringify(saveGrid)));
				break;

			default:
				break;
		}
	};
	const handleKeyBinds = (e) => {
		let valueInt = null;
		switch (e.key) {
			case '-':
				valueInt = size + 2;
				setNewResGrid(valueInt);
				break;
			case '+':
				valueInt = size - 2;
				setNewResGrid(valueInt);
				break;
			case 'j':
			case 'ArrowDown':
				shiftGrid('down');
				break;
			case 'h':
			case 'ArrowLeft':
				shiftGrid('left');
				break;
			case 'k':
			case 'ArrowUp':
				shiftGrid('up');
				break;
			case 'l':
			case 'ArrowRight':
				shiftGrid('right');
				break;
			case '1':
				props.setCurr_click_value('1');
				break;
			case '2':
				props.setCurr_click_value('2');
				break;
			case '3':
				props.setCurr_click_value('3');
				break;
			case '4':
				props.setCurr_click_value('0');
				break;
			case ' ':
				props.toggleStart();
				break;
			case 'c':
				props.toggleClear();
				break;
			case 'r':
				props.toggleReset();
				break;
			default:
				break;
		}
	};
	const saveLocalGridScreen = () => {
		let ctx = childCanvas.current;
		localStorage.setItem('grid', JSON.stringify(grid));
		localStorage.setItem('size', JSON.stringify(size));
		localStorage.setItem('gridImg', ctx.toDataURL('png'));
	};

	//-------UPDATE CANVAS-------------------

	const updateGridFromCanvas = (x, y, curr) => {
		let saveGrid = JSON.parse(JSON.stringify(grid));
		let saveFullGrid = JSON.parse(JSON.stringify(fullGrid));
		props.maxSize + 50 - size !== 0
			? (saveFullGrid[x + (props.maxSize + 50 - size) / 2 - offsetY][
					y + (props.maxSize + 50 - size) / 2 - offsetX
			  ] = curr)
			: (saveFullGrid[x][y] = curr);
		saveGrid[x][y] = curr;
		setGrid(JSON.parse(JSON.stringify(saveGrid)));
		setFullGrid(JSON.parse(JSON.stringify(saveFullGrid)));
	};

	//-------COMPONENT CHANGES----------------

	useBeforeunload((e) => {
		if (props.isMain) {
			localStorage.setItem('grid', JSON.stringify(grid));
			localStorage.setItem('fullGrid', JSON.stringify(fullGrid));
			localStorage.setItem('offsetX', JSON.stringify(offsetX));
			localStorage.setItem('offsetY', JSON.stringify(offsetY));
			localStorage.setItem('size', JSON.stringify(size));
		}
	});

	useEffect(() => {
		const timer = setInterval(play, props.reproductionTime);

		if (props.clearGrid) {
			clearGrids();
			props.toggleClear();
			setClearGrid(false);
		}

		if (props.resetGrid) {
			clearGrids();
			setSize(50);
			setOffsetX(0);
			setOffsetY(0);
			let saveGrid = new Array(50);
			for (let i = 0; i < 50; i++) {
				nextGrid.current[i] = new Array(50);
				saveGrid[i] = new Array(50);
			}
			for (let i = 0; i < 50; i++) {
				for (let j = 0; j < 50; j++) {
					saveGrid[i][j] = 0;
					nextGrid.current[i][j] = 0;
				}
			}
			setGrid(JSON.parse(JSON.stringify(saveGrid)));
			props.toggleReset();
			setResetGrid(false);
		}

		return () => {
			clearInterval(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		props.resetGrid,
		props.clearGrid,
		props.isStart,
		props.reproductionTime,
		grid,
	]);

	return (
		<div className={styles.grid_main_container}>
			<div className={styles.container_res}>
				<input
					type="number"
					min="1"
					max={props.maxSize + 50}
					value={size}
					onChange={(e) => {
						e.preventDefault();
						changeGridRes(e.target.value);
					}}
					className={styles.input_resolution}
				></input>
				<p className={styles.cross_res}>x</p>
				<input
					type="number"
					min="1"
					max={props.maxSize + 50}
					value={size}
					onChange={(e) => {
						e.preventDefault();
						changeGridRes(e.target.value);
					}}
					className={styles.input_resolution}
				></input>
				<div className={styles.inc_container}>
					<button
						name="inc"
						className={styles.inc_buttons}
						onClick={() => {
							incGridRes();
						}}
					>
						⬆
					</button>
					<button
						name="dcm"
						className={styles.inc_buttons}
						onClick={() => {
							decGridRes();
						}}
					>
						⬇
					</button>
				</div>
			</div>

			<div className={styles.grid_container}>
				<Canvas
					curr_click_value={props.curr_click_value}
					size={size}
					grid={grid}
					updateGrid={updateGridFromCanvas}
					theme={props.theme}
					forwardedRef={childCanvas}
					onKeyPress={handleKeyBinds}
				></Canvas>
				{props.showUpload && (
					<UploadBtn onClick={saveLocalGridScreen} text={''}>
						<UploadIcon />
					</UploadBtn>
				)}
			</div>
		</div>
	);
}
