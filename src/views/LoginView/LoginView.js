import React, { useState, useEffect } from 'react';
import { Alert } from '../../components/Alert';
import { Container, CircularProgress, Flex } from '@chakra-ui/react';

import { LoginForm } from '../../components/LoginForm';
import { Topbar } from '../../components/Topbar';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';

import { setLanguage, setTheme, updateDict } from '../../handlers/lookSwitches';

import dictionary from '../../dictionary.json';

export default function LoginView() {
	const [lang, setLangState] = useState(localStorage.getItem('language'));
	const [theme, setThemeState] = useState(localStorage.getItem('theme'));
	const [dict, setDict] = useState(dictionary.eng);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	function login_submit(data) {
		data.preventDefault();
		let username = data.target[0].value;
		let password = data.target[1].value;
		let reg_obj = {
			username,
			password,
		};
		dispatch(authOperations.login(reg_obj));
		setLoading(true);
	}

	const authError = useSelector(authSelectors.getError);

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
		<Container>
			<Topbar
				theme_func={toggleTheme}
				lang_func={toggleLang}
				needTitle={true}
				needLang={true}
				lang={lang}
			/>
			{authError && <Alert alertTitle="Error" alertDescription={authError} />}
			{loading && !authError && (
				<div className="circular-container">
					<Flex justifyContent="center">
						<CircularProgress
							isIndeterminate
							size="100px"
							thickness="5px"
							color="black"
						/>
					</Flex>
				</div>
			)}
			<LoginForm
				login_submit={login_submit}
				login={dict.login}
				enter_nickname={dict.enter_nickname}
				enter_password={dict.enter_password}
				sign_in={dict.sign_in}
				dont_have_acc={dict.dont_have_acc}
			/>
		</Container>
	);
}
