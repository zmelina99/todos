import { ChevronDown } from '@clearmix/design-system';
import React, { useEffect, useRef, useState } from 'react';
import styles from './dropdownSelect.module.scss';

export interface IDropdown {
  dropdownOptions: string[];
  placeholder?: string;
  style?: React.CSSProperties;
}

const DropdownSelectComponent: React.FC<IDropdown> = ({
  dropdownOptions,
  placeholder,
  style,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    placeholder || (dropdownOptions ? dropdownOptions[0] : '')
  );

  const { Dropdown, Dropdown__Input, Dropdown__Options } = styles;

  const menuRef = useRef<HTMLHeadingElement>(null);

  const handleClick = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleOutsideClick = (e: any): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  return (
    <div className={Dropdown}>
      <div
        onClick={(e) => handleDropdownClick(e)}
        onKeyDown={(e) => handleDropdownClick(e)}
        tabIndex={0}
        role="button"
        className={`${Dropdown__Input} ${Dropdown}`}
        style={style}
      >
        {selectedOption}
        <ChevronDown />
      </div>
      {showDropdown && (
        <div className={Dropdown__Options} ref={menuRef}>
          {dropdownOptions.map((option: string) => (
            <div key={option} onClick={() => handleClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelectComponent;
