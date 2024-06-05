import React, { createContext, useContext, useState } from 'react';
import DynamicModal from '../components/Common/Modals/DynamicModal'; 

const DynamicModalContext = createContext();

export const DynamicModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const open = (config) => {
    setModals((prevModals) => [...prevModals, config]);
  };

  const close = () => {
    setModals((prevModals) => prevModals.slice(0, -1));
  };

  return (
    <DynamicModalContext.Provider value={{ open, close }}>
      {children}
      {modals.map((modal, index) => (
        <DynamicModal key={index} {...modal} isOpen={true} close={close} />
      ))}
    </DynamicModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(DynamicModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};