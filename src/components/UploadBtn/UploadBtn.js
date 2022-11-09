import React from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

import styles from './styles/UploadBtn.module.css';

export default function PostSchema({ onClick, text, children }) {
	return (
		<Link
			to="/upload"
			className={`${styles.redirect_link} ${styles.upload_link} icon-svg-wrapper`}
		>
			<Button
				id="post_schema"
				className={styles.upload_btn}
				text={text}
				action={onClick}
			>
				{children}
			</Button>
		</Link>
	);
}
