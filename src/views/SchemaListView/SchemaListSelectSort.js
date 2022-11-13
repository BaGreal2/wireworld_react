import React, { useState } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { AnimatedPlusMinusIcon } from '../../svg';

import styles from './styles/SchemaListSelectSort.module.css';

export default function SchemaListSelectSort({
	sort,
	rating,
	title,
	author,
	selectedSort,
	setSelectedSort,
}) {
	const [isOpenedSort, setIsOpenedSort] = useState(false);

	const toggleOpenSort = () => {
		setIsOpenedSort((prev) => !prev);
	};
	const onSortChange = (sort) => {
		setSelectedSort(sort);
	};

	return (
		<div className={styles.sort_container}>
			<Dropdown
				title={sort}
				content={[
					{ id: 'ratingAvg', value: 'ratingAvg', text: rating },
					{ id: 'title', value: 'title', text: title },
					{ id: 'creator', value: 'creator', text: author },
				]}
				onClick={toggleOpenSort}
				onItemChange={onSortChange}
				selected={
					selectedSort === 'ratingAvg'
						? rating
						: selectedSort === 'title'
						? title
						: selectedSort === 'creator'
						? author
						: rating
				}
			>
				<AnimatedPlusMinusIcon
					className={styles.main_buttons_icon}
					isOpened={isOpenedSort}
				/>
			</Dropdown>
		</div>
	);
}
