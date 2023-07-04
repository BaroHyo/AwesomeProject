import React, { useContext } from 'react';
import { PermissionsContext } from '../context/PermissionsContext';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens';
import { PermissionsScreen } from '../screens/permiso';
import { UpdateSave, VisitaScreen, VisitasScreen } from '../screens/visita';
import { ClienteModal, ClienteScreen, ClientesScreen } from '../screens/cliente';

export type VisitaStackParamList = {
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
  UpdateSave: { id?: string };
};

export type HomeStackParamList = {
  VisitaStack: undefined;
  ClienteStack: undefined;
  PermissionsScreen: undefined;
};

export type ClienteStackParamList = {
  ClientesScreen: undefined;
  ClienteScreen: undefined;
  ClienteModal: undefined;
};

type RootStackParamList = VisitaStackParamList & HomeStackParamList & ClienteStackParamList;

const Stack = createStackNavigator<RootStackParamList>();

export default function Root() {
  return <HomeStack />;
}

function HomeStack() {
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
        <>
          <Stack.Screen name="ClienteStack" component={ClienteStack} />
          {/* <Stack.Screen name="VisitaStack" component={VisitaStack} /> */}
        </>
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
}
function VisitaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VisitasScreen" component={VisitasScreen} />
      <Stack.Screen name="VisitaScreen" component={VisitaScreen} />
      <Stack.Group>
        <Stack.Screen name="UpdateSave" component={UpdateSave} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function ClienteStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="ClientesScreen" component={ClientesScreen} />
      <Stack.Screen name="ClienteScreen" component={ClienteScreen} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          presentation: 'modal',
          gestureEnabled: true,
          keyboardHandlingEnabled: true,
        }}
      >
        <Stack.Screen name="ClienteModal" component={ClienteModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
