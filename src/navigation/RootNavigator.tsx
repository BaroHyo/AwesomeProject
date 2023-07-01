import React, { useContext } from 'react';
import { PermissionsContext } from '../context/PermissionsContext';
import { LoadingScreen, PermissionsScreen } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { VisitaNavigator } from './VisitaNavigator';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const { permissions } = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="VisitaNavigator" component={VisitaNavigator} />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};
