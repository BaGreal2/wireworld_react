import React from 'react';
import { AlertIcon } from '../../svg';

import styles from './styles/Alert.module.css';

export default function Alert({
	alertTitle,
	alertDescription,
	className = '',
}) {
	return (
		<div className={`${styles.alert_container} ${className}`}>
			<div className={styles.alert_icon_wrapper}>
				<AlertIcon className={styles.alert_icon} />
			</div>
			<div className={styles.alert_text_wrapper}>
				<h1 className={styles.alert_title}>{alertTitle}</h1>
				<p className={styles.alert_description}>{alertDescription}</p>
			</div>
		</div>
	);
}
