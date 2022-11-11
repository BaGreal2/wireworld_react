import React, { useState, useEffect } from 'react';
import { Topbar } from '../../components/Topbar';
import { AboutMarkdown } from '../../components/AboutMarkdown';

import { setLanguage, setTheme, updateDict } from '../../handlers/lookSwitches';
import dictionary from '../../dictionary.json';

export default function AboutView() {
	const [lang, setLangState] = useState(localStorage.getItem('language'));
	const [theme, setThemeState] = useState(localStorage.getItem('theme'));
	const [dict, setDict] = useState(dictionary.eng);

	useEffect(() => {
		updateDict(lang, dict, setDict);
	}, [lang, theme, dict]);

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
			<AboutMarkdown lang={lang} />
		</>
	);
}
