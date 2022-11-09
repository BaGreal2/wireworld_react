import React, { useState, useEffect } from 'react';
import { Alert } from '../../components/Alert';
import { CircularProgress, Container, Flex } from '@chakra-ui/react';

import { RegisterForm } from '../../components/RegisterForm';
import { Topbar } from '../../components/Topbar';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';

import { setLanguage, setTheme, updateDict } from '../../handlers/lookSwitches';
import dictionary from '../../dictionary.json';

export default function RegisterView() {
	const [lang, setLangState] = useState(localStorage.getItem('language'));
	const [theme, setThemeState] = useState(localStorage.getItem('theme'));
	const [dict, setDict] = useState(dictionary.eng);
	const [loading, setLoading] = useState(false);
	const authErrorSelector = useSelector(authSelectors.getError);
	const [authError, setAuthError] = useState(authErrorSelector);
	const dispatch = useDispatch();

	function registration_submit(data) {
		data.preventDefault();
		setAuthError(authErrorSelector);
		let username = data.target[0].value;
		let email = data.target[1].value;
		let password = data.target[2].value;
		let confirm_password = data.target[3].value;
		if (confirm_password !== password) {
			setAuthError("Confirmation password doesn't match!");
			return;
		}
		let reg_obj = {
			email,
			username,
			password,
		};
		dispatch(authOperations.register(reg_obj));
		setLoading(true);
	}

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
			<RegisterForm
				registration_submit={registration_submit}
				registration={dict.registration}
				enter_nickname={dict.enter_nickname}
				enter_password={dict.enter_password}
				enter_email={dict.enter_email}
				sign_up={dict.sign_up}
				confirm_password={dict.confirm_password}
				have_acc={dict.have_acc}
			/>
		</Container>
	);
}
