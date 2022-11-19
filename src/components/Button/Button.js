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
	isUpload = false,
}) {
	return (
		<>
			<button
				id={id}
				className={`${styles.custom_btn} ${className} ${
					isMain ? styles.main_buttons : ''
				}`}
				onClick={action}
				type={type}
				disabled={disabled}
			>
				{text ? (
					<>
						<span>
							{text}
							{children && !isUpload ? children : <></>}
						</span>
					</>
				) : (
					<></>
				)}
				{children && isUpload ? children : <></>}
			</button>
		</>
	);
}

export default Button;
