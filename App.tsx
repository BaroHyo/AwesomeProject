import React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PermissionsProvider } from './src/context/PermissionsContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { VisitaProvider } from './src/context/VisitaContext';
import { ChildrenProps } from './src/interfaces/app';

const AppState = ({ children }: ChildrenProps) => {
  return (
    <PermissionsProvider>
      <VisitaProvider>{children}</VisitaProvider>
    </PermissionsProvider>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppState>
          <RootNavigator />
        </AppState>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
