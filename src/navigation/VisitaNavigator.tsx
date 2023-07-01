import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UpdateInsertVisita, VisitaScreen, VisitasScreen } from '../screens';

export type VisitaStackParams = {
  VisitasScreen: undefined;
  VisitaScreen: {
    id?: string;
    nombre?: string;
    direccion?: string;
    tipo?: string;
    observacion?: string;
    latitude?: number;
    longitude?: number;
    fecha?: Date | string;
    estado?: string;
  };
  UpdateInsertVisita: { id?: string };
};

const Stack = createStackNavigator<VisitaStackParams>();

export const VisitaNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="VisitasScreen" component={VisitasScreen} />
      <Stack.Screen name="VisitaScreen" component={VisitaScreen} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          presentation: 'modal',
          gestureEnabled: true,
          keyboardHandlingEnabled: true,
        }}
      >
        <Stack.Screen
          name="UpdateInsertVisita"
          options={{
            title: 'Formulario',
          }}
          component={UpdateInsertVisita}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
