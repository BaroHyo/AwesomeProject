import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Root from './src/navigation/Root';
import { ChildrenProps } from './src/interfaces/app';
import {
  AuthProvider,
  ClienteProvider,
  PermissionsProvider,
  ProductoProvider,
  VisitaProvider,
} from './src/context';

const AppState = ({ children }: ChildrenProps) => {
  return (
    <AuthProvider>
      <PermissionsProvider>
        <VisitaProvider>
          <ProductoProvider>
            <ClienteProvider>{children}</ClienteProvider>
          </ProductoProvider>
        </VisitaProvider>
      </PermissionsProvider>
    </AuthProvider>
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
          <Root />
        </AppState>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
