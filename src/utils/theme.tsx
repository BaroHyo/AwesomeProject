import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

export const CombinedDefaultTheme = merge(
  PaperDefaultTheme,
  NavigationDefaultTheme
);
export const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
