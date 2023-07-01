import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { PermissionsContext } from '../../context/PermissionsContext';
import { Button, Text } from 'react-native-paper';

export const PermissionsScreen = () => {
  const { permissions, askLocationPermission } = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario el uso del GPS para usar esta aplicación{' '}
      </Text>

      <Button mode="contained" onPress={askLocationPermission}>
        Permiso
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
