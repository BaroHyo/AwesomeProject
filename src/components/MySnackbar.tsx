import React from 'react';
import { Snackbar } from 'react-native-paper';

interface SnackbarProps {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export const MySnackbar = ({ visible, title, onClose }: SnackbarProps) => {
  return (
    <Snackbar visible={visible} onDismiss={onClose}>
      {title}
    </Snackbar>
  );
};
