import axios from 'axios';
import React, { useState } from 'react';

import RaitingStars from './RaitingStars';
import { Link } from 'react-router-dom';
import { Alert } from '../Alert';
import { DeleteIcon } from '../../svg';

import styles from './styles/ListItem.module.css';
import '../../config/axios';

export default function ListItem(props) {
	const [error, setError] = useState(null);

	const deletePost = () => {
		console.log(1);
		let data = {
			userId: JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).user)
				._id,
		};

		axios({
			method: 'DELETE',
			url: `/schemas/${props.id}`,
			data,
		})
			.then((res) => {
				console.log('firsdeletedt');
				props.updateList(!props.update);
			})
			.catch((error) => setError(error));
	};

	return (
		<div className={styles.schemas_element}>
			{error && (
				<Alert
					alertTitle={error.message}
					alertDescription={error.responce?.data.message}
					className={styles.schema_alert}
				/>
			)}
			<div className={styles.schemas_element_sub}>
				<div className={styles.schema_text}>
					<h2 className={styles.schema_title}>{props.title}</h2>
					<p className={styles.schema_description}>{props.description}</p>
				</div>
				<Link
					to={'/schemas/' + props.id}
					className={styles.schema_load_link}
					style={{ textDecoration: 'none' }}
				>
					<button className={styles.schema_load}>▶</button>
				</Link>
			</div>
			<div className={styles.creator_rating}>
				<p className={styles.schema_creator}>By: {props.creator}</p>
				<RaitingStars ratingNum={props.rating}></RaitingStars>
				{props.showDelete && <DeleteIcon onClick={deletePost} />}
			</div>
		</div>
	);
}
