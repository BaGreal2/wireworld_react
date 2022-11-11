import React, { useEffect, useState } from 'react';

import { Topbar } from '../../components/Topbar';
import { SchemaPage } from '../../components/SchemaPage';

import { setLanguage, setTheme, updateDict } from '../../handlers/lookSwitches';
import dictionary from '../../dictionary.json';

import '../../config/axios';

export default function UserSchema() {
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
				needLang={true}
				needBack={true}
				lang={lang}
			/>
			<SchemaPage
				start={dict.start}
				continue={dict.continue}
				pause={dict.pause}
				lang={lang}
				theme={theme}
			/>
		</>
	);
}
