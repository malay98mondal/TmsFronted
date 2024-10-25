import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface WarningDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const WarningDialog: React.FC<WarningDialogProps> = ({ open, onClose, message }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10); // Set initial countdown time (10 seconds)

  useEffect(() => {
    let timer: number | undefined; // Declare timer variable without specific NodeJS type

    if (open) {
      // Reset the countdown whenever the dialog opens
      setCountdown(10);

      // Start a timer that counts down every second
      timer = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            window.clearInterval(timer); // Clear the timer if it reaches 0
            navigate('/login'); // Redirect to login
            return 0; // Prevents negative countdown
          }
          return prev - 1; // Decrease countdown by 1 second
        });
      }, 1000); // Update every second
    }

    // Cleanup function to clear the timer if dialog is closed
    return () => {
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [open, navigate]); // Add `navigate` to the dependency array

  const handleCloseAndRedirect = () => {
    onClose(); // Call the onClose prop to close the dialog
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="body2">
          You will be redirected to the login page in {countdown} seconds.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAndRedirect} color="primary">
          Go to Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningDialog;
