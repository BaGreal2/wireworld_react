import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetBackIcon } from '../../svg';

import styles from './styles/Topbar.module.css';

export default function Topbar({
	theme_func,
	lang_func,
	needTitle = false,
	needLang = false,
	needBack = false,
}) {
	let navigate = useNavigate();
	return (
		<>
			<div className={styles.switches}>
				<button
					className={`${styles.custom_btn} ${styles.btn_switch} ${styles.switch}`}
					onClick={theme_func}
				/>
				{needLang && (
					<button
						className={`${styles.custom_btn} ${styles.btn_switch} ${styles.switch_lang}`}
						onClick={lang_func}
					/>
				)}
			</div>
			{needTitle && (
				<Link to="/" style={{ textDecoration: 'none' }}>
					<h1 className={styles.app_title}>WireWorld</h1>
				</Link>
			)}
			{needBack && <GetBackIcon onClick={() => navigate(-1)} />}
		</>
	);
}
