import React, { useEffect, useState } from 'react';
import { Button } from '../../atoms/button';
import styles from './modal.module.scss';

interface IModal {
  setShowModal: any;
}
const Modal: React.FC<IModal> = ({ setShowModal }) => {
  const { Modal__Title, Modal__Input } = styles;
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
      <h1 className={Modal__Title}>Please enter your name:</h1>
      <input
        className={Modal__Input}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button onClick={handleContinue} label="Continue" variant="primary" />
    </div>
  );
};

export default Modal;
