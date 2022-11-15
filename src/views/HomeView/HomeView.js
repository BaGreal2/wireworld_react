import React, { useState, useEffect } from 'react';

import { Topbar } from '../../components/Topbar';
import { Controls } from '../../components/Controls';
import { Grid } from '../../components/Grid';

import { setLanguage, setTheme, updateDict } from '../../handlers/lookSwitches';
import dictionary from '../../dictionary.json';

export default function HomeView() {
	const [lang, setLangState] = useState(localStorage.getItem('language'));
	const [theme, setThemeState] = useState(localStorage.getItem('theme'));
	const [curr_click_value, setCurr_click_value] = useState('3');
	const [speed, setSpeed] = useState(100);
	const [isStart, setIsStart] = useState(false);
	const [clearGrid, setClearGrid] = useState(false);
	const [resetGrid, setResetGrid] = useState(false);
	const [dict, setDict] = useState(dictionary.eng);
	const [startLabel, setStartLabel] = useState(() => {
		return localStorage.getItem('language') === 'eng' ? 'Start' : 'Старт';
	});
	// eslint-disable-next-line no-unused-vars
	const [size, setSize] = useState(() => {
		return localStorage.getItem('size')
			? JSON.parse(localStorage.getItem('size'))
			: 50;
	});
	// eslint-disable-next-line no-unused-vars
	const [fullGrid, setFullGrid] = useState(() => {
		if (localStorage.getItem('fullGrid')) {
			return JSON.parse(localStorage.getItem('fullGrid'));
		} else {
			let saveGrid = new Array(250);
			for (let i = 0; i < 250; i++) {
				saveGrid[i] = new Array(250);
			}

			for (let i = 0; i < 250; i++) {
				for (let j = 0; j < 250; j++) {
					saveGrid[i][j] = 0;
				}
			}
			return JSON.parse(JSON.stringify(saveGrid));
		}
	});
	// eslint-disable-next-line no-unused-vars
	const [offsetX, setOffsetX] = useState(() => {
		if (localStorage.getItem('offsetX')) {
			return JSON.parse(localStorage.getItem('offsetX'));
		} else {
			return 0;
		}
	});
	// eslint-disable-next-line no-unused-vars
	const [offsetY, setOffsetY] = useState(() => {
		if (localStorage.getItem('offsetY')) {
			return JSON.parse(localStorage.getItem('offsetY'));
		} else {
			return 0;
		}
	});
	// eslint-disable-next-line no-unused-vars
	const [grid, setGrid] = useState(() => {
		if (localStorage.getItem('grid')) {
			return JSON.parse(localStorage.getItem('grid'));
		} else {
			let saveGrid = new Array(size);
			for (let i = 0; i < size; i++) {
				saveGrid[i] = new Array(size);
			}

			for (let i = 0; i < size; i++) {
				for (let j = 0; j < size; j++) {
					saveGrid[i][j] = 0;
				}
			}
			return JSON.parse(JSON.stringify(saveGrid));
		}
	});

	//-------COMPONENT REFRESH-----------------

	useEffect(() => {
		updateDict(lang, dict, setDict, setStartLabel);

		// if (
		// 	localStorage.getItem('size') &&
		// 	size !== JSON.parse(localStorage.getItem('size'))
		// ) {
		// 	setSize(JSON.parse(localStorage.getItem('size')));
		// }

		// if (
		// 	localStorage.getItem('grid') &&
		// 	JSON.stringify(grid) !== localStorage.getItem('grid')
		// ) {
		// 	setGrid(JSON.parse(localStorage.getItem('grid')));
		// }
	}, [lang, theme, dict, size, grid]);

	//-------FUNCTIONS-----------------

	const changeClickSpeed = (value) => {
		setSpeed(value);
	};

	const changeClickValue = (value) => {
		setCurr_click_value(value);
	};

	const toggleStart = () => {
		setIsStart(!isStart);
		changeStartLabel();
	};

	const changeStartLabel = () => {
		if (isStart) {
			setStartLabel(dict.continue);
		} else {
			setStartLabel(dict.pause);
		}
	};

	const toggleClear = () => {
		setIsStart(false);
		setClearGrid(!clearGrid);
		setStartLabel(dict.start);
	};

	const toggleReset = () => {
		setIsStart(false);
		setResetGrid(!resetGrid);
		setStartLabel(dict.start);
	};

	const toggleLang = () => {
		setLanguage(setLangState);
	};

	const toggleTheme = () => {
		setTheme(setThemeState);
	};

	return (
		<>
			<Topbar
				theme_func={toggleTheme}
				lang_func={toggleLang}
				needTitle={true}
				lang={lang}
			></Topbar>
			<Controls
				onValueChange={changeClickValue}
				onSpeedChange={changeClickSpeed}
				curr_click_value={curr_click_value}
				reproductionTime={speed}
				toggleStart={toggleStart}
				toggleClear={toggleClear}
				toggleReset={toggleReset}
				startLabel={startLabel}
				lang={lang}
				isStart={isStart}
				isMain={true}
			></Controls>
			<Grid
				size={size}
				maxSize={200}
				fullGrid={fullGrid}
				grid={grid}
				offsetX={offsetX}
				offsetY={offsetY}
				nextGrid={grid}
				curr_click_value={curr_click_value}
				setCurr_click_value={setCurr_click_value}
				reproductionTime={speed}
				isStart={isStart}
				clearGrid={clearGrid}
				resetGrid={resetGrid}
				toggleStart={toggleStart}
				toggleClear={toggleClear}
				toggleReset={toggleReset}
				theme={theme}
				showUpload={true}
				isMain={true}
			></Grid>
		</>
	);
}
