import React from 'react';

import styles from './styles/ControlsHint.module.css';

export default function ControlsHint({ controls_hint }) {
	return (
		<div className={styles.hint_container}>
			<p className={styles.hint_text}>{controls_hint}</p>
		</div>
	);
}
