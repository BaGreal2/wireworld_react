import dictionary from '../dictionary.json';

function setLanguage(setLangState) {
	if (localStorage.getItem('language') === 'ukr') {
		setLangState('eng');
		localStorage.setItem('language', 'eng');
		document.body.id = 'eng';
	} else {
		setLangState('ukr');
		localStorage.setItem('language', 'ukr');
		document.body.id = 'ukr';
	}
	setLangState(localStorage.getItem('language'));
}
function setTheme(setThemeState) {
	if (localStorage.getItem('theme') === 'theme-dark') {
		setThemeState('theme-light');
		localStorage.setItem('theme', 'theme-light');
		document.body.className = 'theme-light';
	} else {
		setThemeState('theme-dark');
		localStorage.setItem('theme', 'theme-dark');
		document.body.className = 'theme-dark';
	}
	setThemeState(localStorage.getItem('theme'));
}

function updateDict(lang, dict, setDict, setStartLabel) {
	if (lang === 'ukr' && dict !== dictionary.ukr) {
		setDict(dictionary.ukr);
		if (setStartLabel) {
			setStartLabel(dictionary.ukr.start);
		}
	} else if (lang === 'eng' && dict !== dictionary.eng) {
		setDict(dictionary.eng);
		if (setStartLabel) {
			setStartLabel(dictionary.eng.start);
		}
	}
}

export { setLanguage, setTheme, updateDict };
