import React from 'react';
import dictionary from '../../dictionary.json';

import styles from './styles/MobileView.module.css';

export default function MovileView() {
	return (
		<div className={styles.mobile_view_container}>
			<h1 className={styles.mobile_view_text}>{dictionary.eng.mobile_view}</h1>
		</div>
	);
}
