import React, { useState } from 'react';

import styles from './styles/Dropdown.module.css';

function Dropdown(props) {
  const [hideDropdown, setHideDropdown] = useState(true);

  const toggleDropdownFunc = () => {
    setHideDropdown(!hideDropdown);
  };

  return (
    <>
      <div
        tabIndex="10"
        className={`${styles.dropdown} ${styles.dropbtn} ${styles.main_buttons
          } ${styles.custom_btn} ${hideDropdown ? styles.dropdown_hide : styles.dropdown_show
          }`}
      >
        <div className={styles.dropdown_content}>
          {props.content.map((elem, i) => {
            return (
              <button
                id={elem.id}
                key={i}
                onClick={() => {
                  props.onItemChange(elem.value);
                  props.onClick();
                  toggleDropdownFunc();
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

        <span
          onClick={() => {
            toggleDropdownFunc();
            props.onClick();
          }}
          className={styles.title}
          data-tip={props.tooltip}
          data-padding="10px 10px 10px 10px"
          data-place="bottom"
          data-offset="{'left': 0, 'right': 0}"
        >
          {props.title}
          {props.children ? props.children : <></>}
        </span>
        <div
          className={styles.side_item_text}
          data-content={props.selected}
        ></div>
      </div>
    </>
  );
}

export default Dropdown;
