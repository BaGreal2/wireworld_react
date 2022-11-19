import React from 'react';

import styles from './styles/ControlsHint.module.css';

export default function ControlsHint() {
	return (
		<div className={styles.hint_container}>
			<p className={styles.hint_text}>
				h, j, k, l (←, ↓, ↑, →) - movement; c, r - clear/reset grid; space -
				start;<br></br>
				1, 2, 3, 4 - item selection; ctrl+z/ctrl+y - undo/redo;
			</p>
		</div>
	);
}
