import React, { useState } from 'react';
import { Button } from '../Button';
import { UploadIcon } from '../../svg';

import styles from './styles/UploadForm.module.css';

export default function UploadForm(props) {
	const [description_value, setDescValue] = useState(0);
	const [title_value, setTitleValue] = useState(0);
	return (
		<>
			<form className={styles.upload_form} onSubmit={props.onSubmit}>
				<img
					className={styles.canvas_screenshot}
					src={localStorage.getItem('gridImg')}
					alt="img"
				></img>
				<div className={styles.title_input_container}>
					<input
						className={styles.title_input}
						autoComplete="off"
						autoCorrect="off"
						placeholder="Title"
						maxLength={15}
						onChange={(elem) => setTitleValue(elem.target.value.length)}
						required
					></input>
					<label className={styles.input_label}>{props.title}</label>
					<span className={styles.ch_remain}>{title_value}/15</span>
				</div>
				<div className={styles.description_input_container}>
					<textarea
						className={styles.description_input}
						autoComplete="off"
						autoCorrect="off"
						placeholder="Description"
						maxLength={90}
						onChange={(elem) => setDescValue(elem.target.value.length)}
						required
					></textarea>
					<label className={styles.input_label}>{props.description}</label>
					<span className={styles.ch_remain}>{description_value}/90</span>
				</div>
				<Button
					className={styles.upload_schema}
					isMain={true}
					text={props.post}
					type="submit"
				>
					<UploadIcon className={styles.upload_icon} />
				</Button>
			</form>
		</>
	);
}
