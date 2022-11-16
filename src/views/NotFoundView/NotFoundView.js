import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dictionary from '../../dictionary.json';

import { updateDict } from '../../handlers/lookSwitches';
import styles from './styles/NotFound.module.css';

export default function NotFound() {
	// eslint-disable-next-line no-unused-vars
	const [lang, setLangState] = useState(localStorage.getItem('language'));
	const [dict, setDict] = useState(dictionary.eng);

	useEffect(() => {
		updateDict(lang, dict, setDict);
	}, [dict, lang]);

	return (
		<div className={styles.not_found_container}>
			<h1 className={styles.not_found_err}>{dict.err404}</h1>
			<h2 className={styles.not_found_text}>{dict.not_found}</h2>
			<Link to="/" className={styles.not_found_link}>
				{dict.return_home}
			</Link>
		</div>
	);
}
