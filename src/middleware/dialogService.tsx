// dialogService.ts
import React, { useState } from 'react';
import WarningDialog from './WarningDialog'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

export const useWarningDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const navigate = useNavigate();

  const showWarningDialog = (message: string) => {
    setDialogMessage(message);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setDialogMessage('');
    navigate('/login'); // Redirect to login
  };

  const DialogComponent = (
    <WarningDialog open={isOpen} onClose={handleClose} message={dialogMessage} />
  );

  return { showWarningDialog, DialogComponent };
};
