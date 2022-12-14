import React, { useState } from 'react';
import {
	AnimatedThemeIcon,
	LanuageIcon,
	LogoutIcon,
	InfoIcon,
	ListIcon,
	UserIcon,
} from '../../svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth';
import { authSelectors } from '../../redux/auth';

import styles from './styles/Burger.module.css';

export default function Burger({
	user_schemas,
	change_lang,
	change_theme,
	about,
	logout,
	sign_in,
	sign_up,
	onLangChange,
	onThemeChange,
}) {
	let [open, setOpen] = useState(false);
	const isAuthenticated = useSelector(authSelectors.isAuthenticated);
	let [isDarkMode, setDarkMode] = useState(
		localStorage.getItem('theme') === 'theme-light' ? true : false
	);
	const dispatch = useDispatch();

	const toggleDarkMode = () => {
		onThemeChange();
		setDarkMode((prev) => !prev);
	};

	const toggleBurger = () => {
		setOpen(!open);
	};

	const clearLocalAll = () => {
		let saveGrid = new Array(50);
		for (let i = 0; i < 50; i++) {
			saveGrid[i] = new Array(50);
		}
		for (let i = 0; i < 50; i++) {
			for (let j = 0; j < 50; j++) {
				saveGrid[i][j] = 0;
			}
		}
		let saveFullGrid = new Array(250);
		for (let i = 0; i < 250; i++) {
			saveFullGrid[i] = new Array(250);
		}
		for (let i = 0; i < 250; i++) {
			for (let j = 0; j < 250; j++) {
				saveFullGrid[i][j] = 0;
			}
		}
		localStorage.setItem('grid', JSON.stringify(saveGrid));
		localStorage.setItem('fullGrid', JSON.stringify(saveFullGrid));
		localStorage.setItem('size', JSON.stringify(50));
		dispatch(authActions.logout());
	};
	return (
		<div className={styles.menu_container}>
			{open && (
				<div className={styles.back_overlay} onClick={() => toggleBurger()} />
			)}
			<div
				className={`${styles.menu_burger} ${open ? styles.open : ''}`}
				onClick={() => toggleBurger()}
			>
				<div className={styles.burger_line_container}>
					<div className={styles.burger_line} />
				</div>
			</div>
			<div
				className={`${styles.menu_content} ${
					open ? styles.content_opened : ''
				}`}
				tabIndex="-1"
			>
				<div className={styles.upper_empty} />
				<Link
					to="/schemas"
					className={styles.content_item}
					style={{ textDecoration: 'none' }}
					tabIndex="-1"
				>
					{user_schemas}
					<div className={styles.icon_container}>
						<ListIcon />
					</div>
				</Link>
				<div
					tabIndex="-1"
					className={styles.content_item}
					onClick={() => onLangChange()}
				>
					{change_lang}
					<div className={styles.icon_container}>
						<LanuageIcon />
					</div>
				</div>
				<div
					tabIndex="-1"
					className={styles.content_item}
					onClick={toggleDarkMode}
				>
					{change_theme}
					<div className={styles.icon_container}>
						<AnimatedThemeIcon isDarkMode={isDarkMode} />
					</div>
				</div>
				<Link
					to="/about"
					tabIndex="-1"
					className={styles.content_item}
					style={{ textDecoration: 'none' }}
				>
					{about}
					<div className={styles.icon_container}>
						<InfoIcon />
					</div>
				</Link>
				<div className={styles.bottom_empty} />
				<Link
					to="/login"
					tabIndex="-1"
					className={styles.content_item}
					style={{ textDecoration: 'none' }}
					onClick={() => clearLocalAll()}
				>
					{isAuthenticated ? (
						<>
							{`${logout} (${JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).user)?.username})`}
							<div className={styles.icon_container}>
								<LogoutIcon />
							</div>
						</>
					) : (
						<>
							{sign_in} & {sign_up}
							<div className={styles.icon_container}>
								<UserIcon />
							</div>
						</>
					)}
				</Link>
			</div>
		</div>
	);
}
