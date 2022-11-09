import React from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

import styles from './styles/LoginForm.module.css';

export default function LoginForm({
	login_submit,
	login,
	enter_nickname,
	enter_password,
	sign_in,
	dont_have_acc,
}) {
	return (
		<div className={styles.login}>
			<h1 className={styles.auth_title}>{login}</h1>
			<form className={styles.auth_form} onSubmit={login_submit} method="post">
				<div className={styles.auth_input_container}>
					<input
						className={styles.auth_input}
						autoComplete="off"
						autoCorrect="off"
						placeholder="Nickname"
						required
					></input>
					<label className={styles.auth_label}>{enter_nickname}</label>
				</div>
				<div className={styles.auth_input_container}>
					<input
						className={styles.auth_input}
						autoComplete="off"
						autoCorrect="off"
						placeholder="Password"
						type="password"
						required
					></input>
					<label className={styles.auth_label}>{enter_password}</label>
				</div>
				<div className={styles.auth_buttons}>
					<Button
						className={styles.sign_in}
						isMain={true}
						text={sign_in}
						type="submit"
					/>
					<Link to="/register" className={styles.auth_redirect_link}>
						<span className={styles.redirect}>{dont_have_acc}</span>
					</Link>
				</div>
			</form>
		</div>
	);
}
