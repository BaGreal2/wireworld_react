import React, { useState } from 'react';
import {
	AnimatedThemeIcon,
	LanuageIcon,
	LogoutIcon,
	InfoIcon,
	ListIcon,
} from '../../svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/auth';
import { allowScroll, blockScroll } from '../../handlers/useScrollBlock';

import styles from './styles/Burger.module.css';

export default function Burger({
	user_schemas,
	change_lang,
	change_theme,
	about,
	logout,
	onLangChange,
	onThemeChange,
}) {
	let [open, setOpen] = useState(false);
	let [isDarkMode, setDarkMode] = useState(
		localStorage.getItem('theme') === 'theme-light' ? true : false
	);
	const dispatch = useDispatch();
	const currParams = window.location.href.split('/');

	const toggleDarkMode = () => {
		onThemeChange();
		setDarkMode((prev) => !prev);
	};

	const toggleBurger = () => {
		if (open) {
			allowScroll();
		} else {
			blockScroll();
		}
		setOpen(!open);
	};

	const clearLocalAll = () => {
		allowScroll();
		let saveGrid = new Array(55);
		for (let i = 0; i < 55; i++) {
			saveGrid[i] = new Array(55);
		}
		for (let i = 0; i < 55; i++) {
			for (let j = 0; j < 55; j++) {
				saveGrid[i][j] = 0;
			}
		}
		localStorage.setItem('grid', JSON.stringify(saveGrid));
		localStorage.setItem('size', JSON.stringify(55));
		dispatch(authActions.logout());
	};

	return (
		<div className={styles.menu_container}>
			<a href="#top">
				<div
					className={`${styles.menu_burger} ${open ? styles.open : ''}`}
					onClick={() => toggleBurger()}
				>
					<div className={styles.burger_line_container}>
						<div className={styles.burger_line} />
					</div>
				</div>
			</a>
			<div
				className={`${styles.menu_content} ${
					open ? styles.content_opened : ''
				}`}
			>
				<div className={styles.upper_empty} />
				<Link
					to="/schemas"
					className={styles.content_item}
					style={{ textDecoration: 'none' }}
					onClick={() => !currParams[3].startsWith('schemas') && allowScroll()}
				>
					{user_schemas}
					<div className={styles.icon_container}>
						<ListIcon />
					</div>
				</Link>
				<div className={styles.content_item} onClick={() => onLangChange()}>
					{change_lang}
					<div className={styles.icon_container}>
						<LanuageIcon />
					</div>
				</div>
				<div className={styles.content_item} onClick={toggleDarkMode}>
					{change_theme}
					<div className={styles.icon_container}>
						<AnimatedThemeIcon isDarkMode={isDarkMode} />
					</div>
				</div>
				<Link
					to="/about"
					className={styles.content_item}
					style={{ textDecoration: 'none' }}
					onClick={() => !currParams[3].startsWith('about') && allowScroll()}
				>
					{about}
					<div className={styles.icon_container}>
						<InfoIcon />
					</div>
				</Link>
				<div className={styles.bottom_empty} />
				<Link
					to="/login"
					className={styles.content_item}
					style={{ textDecoration: 'none' }}
					onClick={() => clearLocalAll()}
				>
					{logout}
					<div className={styles.icon_container}>
						<LogoutIcon />
					</div>
				</Link>
			</div>
		</div>
	);
}