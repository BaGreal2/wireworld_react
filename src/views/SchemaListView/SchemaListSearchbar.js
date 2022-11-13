import React from 'react';

import styles from './styles/SchemaListSearchbar.module.css';

export default function SchemaListSearchbar({
	setSearch,
	search,
	searchPlaceholder,
}) {
	return (
		<>
			<div className={styles.auth_input_container}>
				<input
					value={search}
					onChange={(val) => setSearch(val.target.value)}
					className={`${styles.searchbar} ${styles.auth_input}`}
					placeholder="Search"
				></input>
				<label className={styles.auth_label}>{searchPlaceholder}</label>
			</div>
		</>
	);
}
