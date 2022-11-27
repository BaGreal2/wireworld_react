import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Burger } from '../Burger';

import dictionary from '../../dictionary.json';
import styles from './styles/Topbar.module.css';

export default function Topbar({ theme_func, lang_func, lang }) {
	let [dict, setDict] = useState(() => {
		if (localStorage.getItem('language') === 'ukr') {
			return dictionary.ukr;
		} else {
			return dictionary.eng;
		}
	});

	const addShadow = () => {
		console.log(window.scrollY);
	};

	window.addEventListener('scroll', addShadow, false);

	useEffect(() => {
		if (lang === 'ukr' && dict !== dictionary.ukr) {
			setDict(dictionary.ukr);
		} else if (lang === 'eng' && dict !== dictionary.eng) {
			setDict(dictionary.eng);
		}
		// return () => {
		// 	window.removeEventListener('scroll', addShadow);
		// };
	}, [lang, dict]);

	return (
		<div className={styles.topbar_container}>
			<div className={styles.topbar_content}>
				<Link to="/" className={styles.app_title}>
					<h1 className={styles.app_title_text}>WireWorld</h1>
				</Link>
				<div className={styles.switches}>
					<Burger
						user_schemas={dict.user_schemas}
						change_lang={dict.change_lang}
						change_theme={dict.change_theme}
						about={dict.about}
						logout={dict.logout}
						sign_in={dict.sign_in}
						sign_up={dict.sign_up}
						onLangChange={lang_func}
						onThemeChange={theme_func}
					/>
				</div>
			</div>
		</div>
	);
}
