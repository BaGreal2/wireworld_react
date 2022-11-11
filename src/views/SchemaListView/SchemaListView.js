import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Container, CircularProgress, Flex } from '@chakra-ui/react';
import { Alert } from '../../components/Alert';
import { Topbar } from '../../components/Topbar';

import { SchemasListPage } from '../../components/SchemasListPage';

import { setLanguage, setTheme, updateDict } from '../../handlers/lookSwitches';
import dictionary from '../../dictionary.json';

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
			url: `/schemas?perPage=5&page=${page}`,
		})
			.then((res) => {
				schemasDispatch({ type: 'SET', payload: res.data.schemas });
				setCount(res.data.count);
			})
			.catch((error) => setError(error))
			.finally(() => setSchemasLoading(false));
	}, [page, update, lang, theme, dict]);

	return (
		<Container>
			<Topbar
				theme_func={toggleTheme}
				lang_func={toggleLang}
				needLang={true}
				needBack={true}
				lang={lang}
			></Topbar>
			{schemasLoading && (
				<Flex justifyContent="center">
					<CircularProgress
						isIndeterminate
						size="100px"
						thickness="5px"
						color="black"
					/>
				</Flex>
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
				/>
			)}
		</Container>
	);
}
