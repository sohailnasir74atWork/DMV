/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppWrapper from './App'; // Import your AppWrapper component
import { name as appName } from './app.json';
import { GlobalProvider } from './src/GlobelStates/States'; // Import your GlobalProvider

const App = () => (
  <GlobalProvider>
    <AppWrapper />
  </GlobalProvider>
);

AppRegistry.registerComponent(appName, () => App);
