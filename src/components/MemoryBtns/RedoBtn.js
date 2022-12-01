import React from 'react';
import { ArrowRightIcon } from '../../svg';
import { Button } from '../Button';

import styles from './styles/RedoBtn.module.css';

export default function UndoBtn({ disabled, onClick }) {
	return (
		<>
			<Button
				className={styles.redo}
				text=" "
				disabled={disabled}
				action={onClick}
			>
				<ArrowRightIcon />
			</Button>
		</>
	);
}
