import React, { useState, useEffect } from 'react';

import { Topbar } from '../../components/Topbar';
import { Controls } from '../../components/Controls';
import { Grid } from '../../components/Grid';

import { setLanguage, setTheme, updateDict } from '../../handlers/lookSwitches';
import dictionary from '../../dictionary.json';

export default function HomeView() {
	const [lang, setLangState] = useState(localStorage.getItem('language'));
	const [theme, setThemeState] = useState(localStorage.getItem('theme'));
	const [curr_click_value, setCurr_click_value] = useState(3);
	const [speed, setSpeed] = useState(100);
	const [isStart, setIsStart] = useState(false);
	const [clearGrid, setClearGrid] = useState(false);
	const [resetGrid, setResetGrid] = useState(false);
	const [dict, setDict] = useState(dictionary.eng);
	const [startLabel, setStartLabel] = useState(() => {
		return localStorage.getItem('language') === 'eng' ? 'Start' : 'Старт';
	});
	const [size, setSize] = useState(() => {
		return localStorage.getItem('size')
			? JSON.parse(localStorage.getItem('size'))
			: 55;
	});
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

		if (
			localStorage.getItem('size') &&
			size !== JSON.parse(localStorage.getItem('size'))
		) {
			setSize(JSON.parse(localStorage.getItem('size')));
		}

		if (
			localStorage.getItem('grid') &&
			JSON.stringify(grid) !== localStorage.getItem('grid')
		) {
			setGrid(JSON.parse(localStorage.getItem('grid')));
		}
	}, [lang, theme, dict, size, grid]);

	//-------FUNCTIONS-----------------

	const changeClickSpeed = (value) => {
		console.log(1);
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
				needLang={true}
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
				isMain={true}
			></Controls>
			<Grid
				size={size}
				grid={grid}
				nextGrid={grid}
				curr_click_value={curr_click_value}
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
