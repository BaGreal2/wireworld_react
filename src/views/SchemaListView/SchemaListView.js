import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Container, CircularProgress } from '@chakra-ui/react';
import { Alert } from '../../components/Alert';
import { Topbar } from '../../components/Topbar';

import { SchemasListPage } from '../../components/SchemasListPage';
import SchemaListSearchbar from './SchemaListSearchbar';
import SchemaListSelectSort from './SchemaListSelectSort';

import { setLanguage, setTheme, updateDict } from '../../handlers/lookSwitches';
import dictionary from '../../dictionary.json';
import styles from './styles/SchemaListView.module.css';

function schemasReducer(state, { type, payload }) {
	switch (type) {
		case 'SET':
			return payload;

		default:
			throw new Error('Action type not implemented');
	}
}

export default function SchemaListView() {
	const [lang, setLangState] = useState(localStorage.getItem('language'));
	const [theme, setThemeState] = useState(localStorage.getItem('theme'));
	const [dict, setDict] = useState(dictionary.eng);
	const [schemasLoading, setSchemasLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [selectedSort, setSelectedSort] = useState('ratingAvg');
	const [count, setCount] = useState();
	const [schemas, schemasDispatch] = useReducer(schemasReducer, []);
	const [update, setUpdate] = useState(false);

	const updateList = (value) => {
		setUpdate(value);
		if (page - 1 === (count - 1) / 5) {
			setPage(() => {
				if (page === 1) {
					return page;
				}
				return page - 1;
			});
		}
	};

	const decPage = () => {
		setPage(page - 1);
	};

	const incPage = () => {
		setPage(page + 1);
	};

	const toggleLang = () => {
		setLanguage(setLangState);
	};

	const toggleTheme = () => {
		setTheme(setThemeState);
	};

	useEffect(() => {
		updateDict(lang, dict, setDict);
		setSchemasLoading(true);

		axios({
			method: 'GET',
			url: `/schemas?perPage=5&page=${page}&search=${search}&sortBy=${selectedSort}`,
		})
			.then((res) => {
				schemasDispatch({ type: 'SET', payload: res.data.schemas });
				setCount(res.data.count);
			})
			.catch((error) => setError(error))
			.finally(() => setSchemasLoading(false));
	}, [page, update, lang, theme, dict, search, selectedSort]);

	return (
		<Container>
			<Topbar
				theme_func={toggleTheme}
				lang_func={toggleLang}
				needLang={true}
				needBack={true}
				lang={lang}
			></Topbar>
			<div className={styles.search_sort_container}>
				<SchemaListSearchbar
					search={search}
					setSearch={setSearch}
					searchPlaceholder={dict.search}
				/>
				<SchemaListSelectSort
					sort={dict.sort}
					rating={dict.rating}
					title={dict.title}
					author={dict.author}
					selectedSort={selectedSort}
					setSelectedSort={setSelectedSort}
				/>
			</div>
			{schemasLoading && (
				<div className={styles.circular_container}>
					<CircularProgress
						isIndeterminate
						size="100px"
						thickness="5px"
						color="black"
					/>
				</div>
			)}
			{error && !schemasLoading && (
				<Alert
					alertTitle={error.message}
					alertDescription={error.responce?.data.message}
					className="schemas-alert"
				/>
			)}
			{!schemasLoading && !error && (
				<SchemasListPage
					schemas={schemas}
					next={dict.next}
					previous={dict.previous}
					no_schemas={dict.no_schemas}
					decPage={decPage}
					incPage={incPage}
					page={page}
					count={count}
					update={update}
					updateList={updateList}
					search={search}
					setSearch={setSearch}
				/>
			)}
		</Container>
	);
}
