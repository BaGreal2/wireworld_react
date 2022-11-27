import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from '../../components/Alert';
import { Container, CircularProgress } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/Topbar';
import { UploadForm } from '../../components/UploadForm';

import { setLanguage, setTheme, updateDict } from '../../handlers/lookSwitches';
import dictionary from '../../dictionary.json';

import styles from './styles/UploadView.module.css';

export default function UploadView() {
	const [lang, setLangState] = useState(localStorage.getItem('language'));
	const [theme, setThemeState] = useState(localStorage.getItem('theme'));
	const [dict, setDict] = useState(dictionary.eng);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	let navigate = useNavigate();

	useEffect(() => {
		updateDict(lang, dict, setDict);
	}, [lang, theme, dict]);

	function createSchema(data) {
		data.preventDefault();
		setLoading(true);
		let title = data.target[0].value;
		let description = data.target[1].value;
		data = {
			title,
			description,
			cell_arr: localStorage.getItem('grid'),
			size: JSON.parse(localStorage.getItem('size')),
			rating: [],
			creator: JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).user)
				._id,
			creatorName: JSON.parse(
				JSON.parse(localStorage.getItem('persist:auth')).user
			).username,
		};

		axios({
			method: 'POST',
			url: '/schemas',
			data,
		})
			.then((res) => {
				navigate(`/schemas/${res.data._id}`, true);
			})
			.catch((error) => {
				console.dir(error);
				setError(error);
				setLoading(false);
			})
			.finally(() => setLoading(false));
	}

	const toggleLang = () => {
		setLanguage(setLangState);
	};

	const toggleTheme = () => {
		setTheme(setThemeState);
	};

	return (
		<Container>
			<Topbar
				theme_func={toggleTheme}
				lang_func={toggleLang}
				needLang={true}
				needBack={true}
				lang={lang}
			></Topbar>
			{error && !loading && (
				<Alert
					alertTitle={error.message}
					alertDescription={error.responce?.data.message}
					className="upload-alert"
				/>
			)}
			{loading && (
				<div className={styles.circular_container}>
					<CircularProgress
						isIndeterminate
						size="100px"
						thickness="5px"
						color="black"
					/>
				</div>
			)}
			<UploadForm
				title={dict.title}
				description={dict.description}
				post={dict.post}
				onSubmit={createSchema}
			/>
		</Container>
	);
}
