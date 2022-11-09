import React from 'react';

import styles from './styles/RaitingStars.module.css';

export default function RaitingStars(props) {
	const percentageWidth = Math.round((((props.ratingNum / 5) * 100) / 10) * 10);
	return (
		<div className={styles.rating_wrapper}>
			<div className={styles.stars_outer}>
				<div
					className={styles.stars_inner}
					style={{ width: `${percentageWidth}%` }}
				></div>
			</div>
			<div className={styles.stars_number}>
				{Math.round(props.ratingNum * 10) / 10}
			</div>
		</div>
	);
}
