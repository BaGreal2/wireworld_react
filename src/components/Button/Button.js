import React from 'react';

import styles from './styles/Button.module.css';

function Button({
	id,
	className = '',
	isMain = false,
	action,
	type = 'button',
	disabled = false,
	text,
	children,
}) {
	return (
		<>
			<button
				id={id}
				className={`${styles.custom_btn} ${className} ${
					isMain ? styles.main_buttons : ''
				}`}
				onClick={action}
				type={type ? type : 'button'}
				disabled={disabled}
			>
				{text ? <span>{text}</span> : <></>}
				{children ? children : <></>}
			</button>
		</>
	);
}

export default Button;
