
import React, { useState } from "react";
import styles from '../styles/components/ToggleSwitch.module.scss';
import { twMerge } from 'tailwind-merge'

const ToggleSwitch = ({ inputName, active, handleToggle, className }) => {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = (e) => {
    handleToggle && handleToggle(e, !isToggled);
    setIsToggled(!isToggled)
  };

  return (
    <div
      className={twMerge(`
        ${styles['toggle-switch']}
        ${className ? className : ''}
      `)}
    >
      <input 
        name={inputName} 
        type="checkbox" 
        checked={isToggled || active} 
        onChange={onToggle}
      />
      <span 
        className={styles["switch"]} 
        onClick={(e) => onToggle(e)}
      />
    </div>
  );
};

export default ToggleSwitch;