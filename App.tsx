import React, { useCallback, useMemo, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Root from './src/navigation/Root';
import { ChildrenProps } from './src/interfaces/app';
import {
  AuthProvider,
  ClienteProvider,
  PermissionsProvider,
  PreferencesContext,
  ProductoProvider,
  VisitaProvider,
} from './src/context';
import { CombinedDarkTheme, CombinedDefaultTheme } from './src/utils/theme';

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

/*const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};*/

function App() {
  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <AppState>
            <Root />
          </AppState>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

export default App;
