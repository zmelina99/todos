import React, { useEffect, useState } from 'react';
import { Button } from '../../atoms/button';
import styles from './modal.module.scss';
import todos from '../../todos.png';

interface IModal {
  setShowModal: any;
}
const Modal: React.FC<IModal> = ({ setShowModal }) => {
  const {
    Modal__Title,
    Modal__Input,
    Modal__NameBox,
    Modal__NameBox__Header,
    Modal__NameBox__Footer,
    Modal__NameBox__Footer__Button,
  } = styles;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedValue = localStorage.getItem('savedUsername');
    if (savedValue) {
      setInputValue(savedValue);
      setShowModal(false);
    }
  }, []);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
    localStorage.setItem('savedUsername', event.target.value);
  };

  const handleContinue = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.Modal}>
      <div className={Modal__NameBox}>
        <div className={Modal__NameBox__Header}>
          <h1 className={Modal__Title}>Please enter your name:</h1>
          <input
            className={Modal__Input}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className={Modal__NameBox__Footer}>
          <img src={todos} width="100px" alt='todo-list'/>
          <div className={Modal__NameBox__Footer__Button}>
            {' '}
            <Button
              onClick={handleContinue}
              label="Continue"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
