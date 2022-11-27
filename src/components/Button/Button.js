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
  tooltip
}) {
  return (
    <>
      <button
        id={id}
        className={`${styles.custom_btn} ${className} ${isMain ? styles.main_buttons : ''
          }`}
        onClick={() => action && action()}
        type={type}
        disabled={disabled}
        data-tip={tooltip}
        data-padding="10px 10px 10px 10px"
        data-place="top"
        data-offset="{'left': 0, 'right': 0}"
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
