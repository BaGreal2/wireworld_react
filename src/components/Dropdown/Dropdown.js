import React, { useState } from 'react';
import { Button } from '../Button';

import styles from './styles/Dropdown.module.css';

function Dropdown(props) {
	const [hideDropdown, setHideDropdown] = useState(true);
	const toggleDropdown = () => {
		setHideDropdown(!hideDropdown);
	};
	return (
		<>
			<div
				tabIndex="10"
				className={`${styles.dropdown} ${styles.dropbtn} ${
					styles.main_buttons
				} ${styles.custom_btn} ${
					hideDropdown ? styles.dropdown_hide : styles.dropdown_show
				}`}
				onClick={() => toggleDropdown()}
			>
				<div className={styles.dropdown_content}>
					{props.content.map((elem, i) => {
						return (
							<button
								id={elem.id}
								key={i}
								onClick={() => {
									props.onItemChange(elem.value);
									console.log(2);
									toggleDropdown();
								}}
								value={elem.value}
								className={`${styles.main_buttons} ${styles.custom_btn} ${styles.dropdown_element}`}
							>
								<span className={styles.dropdown_element_text}>
									{elem.text}
								</span>
							</button>
						);
					})}
				</div>

				<span className={styles.title}>{props.title} </span>
				<div
					className={styles.side_item_text}
					data-content={props.selected}
				></div>
			</div>
		</>
	);
}

export default Dropdown;
