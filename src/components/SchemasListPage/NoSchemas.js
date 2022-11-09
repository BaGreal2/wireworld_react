import React from 'react';

import styles from './styles/NoSchemas.module.css';

export default function NoSchemas({ no_schemas }) {
	return (
		<div className={styles.no_schemas_container}>
			<h1 className={styles.no_schemas_text}>{no_schemas}</h1>
		</div>
	);
}
