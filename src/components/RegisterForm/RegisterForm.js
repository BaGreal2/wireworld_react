import React from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

import styles from './styles/RegisterForm.module.css';

export default function RegisterForm({
	registration_submit,
	registration,
	enter_nickname,
	enter_password,
	enter_email,
	sign_up,
	confirm_password,
	have_acc,
}) {
	return (
		<div className={styles.registration}>
			<h1 className={styles.auth_title}>{registration}</h1>
			<form
				className={styles.auth_form}
				onSubmit={registration_submit}
				method="post"
			>
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
						placeholder="Email"
						type="email"
						autoComplete="off"
						autoCorrect="off"
						required
					></input>
					<label className={styles.auth_label}>{enter_email}</label>
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
				<div className={styles.auth_input_container}>
					<input
						className={styles.auth_input}
						autoComplete="off"
						autoCorrect="off"
						placeholder="Confirm Password"
						type="password"
						required
					></input>
					<label className={styles.auth_label}>{confirm_password}</label>
				</div>
				<div className={styles.auth_buttons}>
					<Button
						className={styles.sign_up}
						isMain={true}
						text={sign_up}
						type="submit"
					/>
					<Link to="/login" className={styles.auth_redirect_link}>
						<span className={styles.redirect}>{have_acc}</span>
					</Link>
				</div>
			</form>
		</div>
	);
}
