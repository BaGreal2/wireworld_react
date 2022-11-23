import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import {
	PlayIcon,
	ClearIcon,
	ResetIcon,
	AnimatedPlusMinusIcon,
} from '../../svg';

import dictionary from '../../dictionary.json';

import styles from './styles/Controls.module.css';

export default function Controls(props) {
	let [isOpenedItem, setIsOpenedItem] = useState(false);
	let [isOpenedSpeed, setIsOpenedSpeed] = useState(false);
	let [dict, setDict] = useState(() => {
		if (localStorage.getItem('language') === 'ukr') {
			return dictionary.ukr;
		} else {
			return dictionary.eng;
		}
	});

	const toggleOpenItem = () => {
		setIsOpenedItem((prev) => !prev);
	};
	const toggleOpenSpeed = () => {
		setIsOpenedSpeed((prev) => !prev);
	};

	//-------COMPONENT CHANGES----------------

	useEffect(() => {
		if (props.lang === 'ukr' && dict !== dictionary.ukr) {
			setDict(dictionary.ukr);
		} else if (props.lang === 'eng' && dict !== dictionary.eng) {
			setDict(dictionary.eng);
		}
	}, [props.lang, dict, isOpenedItem, isOpenedSpeed]);
	return (
		<div className={props.isMain ? styles.controls : styles.controls_upload}>
			<Button
				id={'start'}
				isMain={true}
				text={props.startLabel}
				action={props.toggleStart}
			>
				<PlayIcon
					className={styles.main_buttons_icon}
					isStart={props.isStart}
				/>
			</Button>
			{props.isMain && (
				<Button
					id={'clear'}
					isMain={true}
					text={dict.clear}
					action={props.toggleClear}
				>
					<ClearIcon className={styles.main_buttons_icon} />
				</Button>
			)}
			{props.isMain && (
				<Button
					id={'reset'}
					isMain={true}
					text={dict.reset}
					action={props.toggleReset}
				>
					<ResetIcon className={styles.main_buttons_icon} />
				</Button>
			)}
			<Dropdown
				title={dict.pick_item}
				onClick={toggleOpenItem}
				content={[
					{ id: 'empty', value: '0', text: dict.empty },
					{ id: 'head', value: '1', text: dict.head },
					{ id: 'tail', value: '2', text: dict.tail },
					{ id: 'conductor', value: '3', text: dict.conductor },
				]}
				onItemChange={props.onValueChange}
				selected={
					Number(props.currClickValue) === 0
						? dict.empty
						: Number(props.currClickValue) === 1
						? dict.head
						: Number(props.currClickValue) === 2
						? dict.tail
						: Number(props.currClickValue) === 3
						? dict.conductor
						: dict.conductor
				}
			>
				<AnimatedPlusMinusIcon
					className={styles.main_buttons_icon}
					isOpened={isOpenedItem}
				/>
			</Dropdown>
			<Dropdown
				title={dict.pick_speed}
				content={[
					{ id: 'empty', value: '210', text: dict.slow },
					{ id: 'head', value: '100', text: dict.medium },
					{ id: 'tail', value: '30', text: dict.fast },
					{ id: 'conductor', value: '10', text: dict.unlimited },
				]}
				onClick={toggleOpenSpeed}
				onItemChange={props.onSpeedChange}
				selected={
					Number(props.reproductionTime) === 210
						? dict.slow
						: Number(props.reproductionTime) === 100
						? dict.medium
						: Number(props.reproductionTime) === 30
						? dict.fast
						: Number(props.reproductionTime) === 10
						? dict.unlimited
						: dict.medium
				}
			>
				<AnimatedPlusMinusIcon
					className={styles.main_buttons_icon}
					isOpened={isOpenedSpeed}
				/>
			</Dropdown>
			{!props.isMain && (
				<>
					<form
						className={styles.rate_schema_container}
						onSubmit={!props.userRated ? props.sendRate : props.retractRate}
					>
						<label
							className={styles.rate_schema_label}
							disabled={props.isOwner ? true : false}
						>
							{dict.rate_schema}
						</label>
						<select
							className={styles.rate_schema_select}
							disabled={props.isOwner || props.userRated ? true : false}
							defaultValue={props.selectedRate.toString()}
						>
							<option value="1">1 {dict.star}</option>
							<option value="2">2 {dict.stars}</option>
							<option value="3">3 {dict.stars}</option>
							<option value="4">4 {dict.stars}</option>
							<option value="5">5 {dict.stars_5}</option>
						</select>
						<Button
							type="submit"
							id={'submit_rating'}
							isMain={true}
							text={props.userRated ? dict.retract : dict.rate}
							disabled={props.isOwner ? true : false}
						/>
					</form>
				</>
			)}
		</div>
	);
}
