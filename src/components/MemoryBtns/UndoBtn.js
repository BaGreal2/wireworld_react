import React from 'react';
import { ArrowLeftIcon } from '../../svg';
import { Button } from '../Button';

import styles from './styles/UndoBtn.module.css';

export default function UndoBtn({ disabled, onClick }) {
	return (
		<>
			<Button
				className={styles.undo}
				text=" "
				disabled={disabled}
				action={onClick}
			>
				<ArrowLeftIcon />
			</Button>
		</>
	);
}
