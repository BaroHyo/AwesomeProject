import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface MessageProps {
  visible: boolean;
  icon: string;
  title: string;
  onSubmit: () => void;
  onClose: () => void;
}

export const MyMessageBox = ({
  visible,
  icon,
  title,
  onSubmit,
  onClose,
}: MessageProps) => {
  return (
    <Portal>
      <Dialog visible={visible} style={{ backgroundColor: '#fff' }}>
        <Dialog.Icon icon={icon} color="black" />
        <Dialog.Title style={{ textAlign: 'center' }}>
          Confirmación
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
            {title}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancelar</Button>
          <Button onPress={onSubmit}>Aceptar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
