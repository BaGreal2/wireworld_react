import React from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

import styles from './styles/LogoutBtn.module.css';

export default function LogoutBtn({ text, onClick, children }) {
	return (
		<Link to="/login" className={'icon-svg-wrapper ' + styles.redirect_link}>
			<Button
				id="logout"
				className={styles.logout_btn}
				text={text}
				action={onClick}
			>
				{children}
			</Button>
		</Link>
	);
}
