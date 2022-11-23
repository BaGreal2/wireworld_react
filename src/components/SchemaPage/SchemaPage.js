import axios from 'axios';
import React, { useEffect, useState, useReducer, useRef } from 'react';
import { CircularProgress, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { Grid } from '../Grid';
import { Controls } from '../Controls';
import { Alert } from '../Alert';

import '../../config/axios';
import styles from './styles/SchemaPage.module.css';

function schemaReducer(state, { type, payload }) {
	switch (type) {
		case 'SET':
			return payload;
		default:
			throw new Error('Action type not implemented');
	}
}

export default function SchemaPage(props) {
	const [currClickValue, setCurrClickValue] = useState(3);
	const [speed, setSpeed] = useState(100);
	const [isStart, setIsStart] = useState(false);
	const [clearGrid, setClearGrid] = useState(false);
	const [resetGrid, setResetGrid] = useState(false);
	const [userRated, setUserRated] = useState(false);
	const [selectedRate, setSelectedRate] = useState(0);
	const searchParams = useParams();
	const [startLabel, setStartLabel] = useState(() => {
		return localStorage.getItem('language') === 'eng' ? 'Start' : 'Старт';
	});
	const [schema, schemaDispatch] = useReducer(schemaReducer, []);
	let fullGrid = useRef([]);
	const [schemaLoading, setSchemaLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setSchemaLoading(true);

		axios({
			method: 'GET',
			url: `/schemas/${searchParams.id}`,
		})
			.then((res) => {
				schemaDispatch({ type: 'SET', payload: res.data.schema });
				setUserRated(() => {
					return res.data.schema.userRated?.length > 0
						? res.data.schema.userRated.some(
								(elem) =>
									elem.userId ===
									JSON.parse(
										JSON.parse(localStorage.getItem('persist:auth')).user
									)._id
						  )
						: false;
				});
				setSelectedRate(() => {
					return res.data.schema.userRated.some(
						(elem) =>
							elem.userId ===
							JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).user)
								._id
					)
						? res.data.schema.userRated.find(
								(elem) =>
									elem.userId ===
									JSON.parse(
										JSON.parse(localStorage.getItem('persist:auth')).user
									)._id
						  )?.userRate
						: 0;
				});

				for (let i = 0; i < res.data.schema.size + 50; i++) {
					fullGrid.current[i] = new Array(res.data.schema.size + 50);
					for (let j = 0; j < res.data.schema.size + 50; j++) {
						if (
							i > 24 &&
							i < 26 + res.data.schema.size &&
							j > 24 &&
							j < 26 + res.data.schema.size
						) {
							JSON.parse(res.data.schema.cell_arr)[i - 25] !== undefined
								? (fullGrid.current[i][j] = JSON.parse(
										res.data.schema.cell_arr
								  )[i - 25][j - 25])
								: (fullGrid.current[i][j] = 0);
						} else {
							fullGrid.current[i][j] = 0;
						}
					}
				}
			})
			.catch((error) => setError(error))
			.finally(() => setSchemaLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userRated]);

	const changeClickSpeed = (value) => {
		setSpeed(value);
	};

	const changeClickValue = (value) => {
		setCurrClickValue(value);
	};

	const toggleStart = () => {
		setIsStart(!isStart);
		changeStartLabel();
	};

	const changeStartLabel = () => {
		if (isStart) {
			setStartLabel(props.continue);
		} else {
			setStartLabel(props.pause);
		}
	};

	const toggleClear = () => {
		setIsStart(false);
		setClearGrid(!clearGrid);
		setStartLabel(props.start);
	};

	const toggleReset = () => {
		setIsStart(false);
		setResetGrid(!resetGrid);
		setStartLabel(props.start);
	};

	const sendRate = (data) => {
		data.preventDefault();
		setUserRated(true);
		let dataNum = Number(data.target[0].value);
		let newRating = [...schema.rating, dataNum];
		let dataUpdate = {
			rating: newRating,
			userRated: schema.userRated,
			userId: JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).user)
				._id,
		};
		axios({
			method: 'PUT',
			url: `/schemas/${schema._id}`,
			data: dataUpdate,
		})
			.then((res) => {})
			.catch((error) => {
				console.dir(error);
			});
	};

	const retractRate = (data) => {
		data.preventDefault();
		setUserRated(false);
		let dataNum = Number(data.target[0].value);
		let findRateIndex = schema.rating.indexOf(dataNum);
		let cloneSchemaRating = schema.rating.slice();
		if (findRateIndex > -1) {
			cloneSchemaRating.splice(findRateIndex, 1);
		}
		let dataUpdate = {
			rating: cloneSchemaRating,
			userRated: schema.userRated,
			userId: JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).user)
				._id,
		};
		axios({
			method: 'PUT',
			url: `/schemas/retract/${schema._id}`,
			data: dataUpdate,
		})
			.then((res) => {})
			.catch((error) => {
				console.dir(error);
			});
	};

	return (
		<div>
			{schemaLoading && (
				<Flex justifyContent="center">
					<CircularProgress
						isIndeterminate
						size="100px"
						thickness="5px"
						color="black"
					/>
				</Flex>
			)}
			{error && !schemaLoading && (
				<Alert
					alertTitle={error.message}
					alertDescription={error.responce?.data.message}
					className="schema-alert"
				/>
			)}
			{schema && !schemaLoading && !error && (
				<>
					<h1 className={styles.schema_open_title}>{schema.title}</h1>
					<Controls
						onValueChange={changeClickValue}
						onSpeedChange={changeClickSpeed}
						currClickValue={currClickValue}
						reproductionTime={speed}
						toggleStart={toggleStart}
						toggleClear={toggleClear}
						toggleReset={toggleReset}
						startLabel={startLabel}
						userRated={userRated}
						setUserRated={setUserRated}
						lang={props.lang}
						isMain={false}
						isStart={isStart}
						isOwner={
							JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).user)
								._id === schema.creator
						}
						sendRate={sendRate}
						retractRate={retractRate}
						selectedRate={selectedRate}
					></Controls>
					<Grid
						size={schema.size}
						maxSize={schema.size}
						fullGrid={fullGrid.current}
						grid={JSON.parse(schema.cell_arr)}
						offsetX={0}
						offsetY={0}
						nextGrid={JSON.parse(schema.cell_arr)}
						currClickValue={currClickValue}
						reproductionTime={speed}
						isStart={isStart}
						clearGrid={clearGrid}
						resetGrid={resetGrid}
						toggleStart={toggleStart}
						toggleClear={toggleClear}
						toggleReset={toggleReset}
						theme={props.theme}
						showUpload={false}
						isMain={false}
					></Grid>
				</>
			)}
		</div>
	);
}
