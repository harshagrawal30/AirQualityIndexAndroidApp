/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import ListOfDevices from './src/listOfDevices';
import HomeScreen from './src/HomeScreen';
import OneTimeAQViewer from './src/oneTimeAQViewer';
import { PRIMARY_COLOR } from './src/colors';
import PlacesPage from './src/placesPage';
import PlaceHistory from './src/placeHistory';

const Stack = createNativeStackNavigator();

const App = () => {

  const check = async () => {
    try {
      let available;
      available = await RNBluetoothClassic.isBluetoothEnabled();
      setIsBleEna(available)
      setIsLoading(false)
    }
    catch (err) {
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='HomeScreen' options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name='ListOfDevices' options={{ headerShown: false }} component={ListOfDevices} />
        <Stack.Screen name='OneTimeAQViewer' options={{ title: 'Air Quality Detail', headerStyle: { backgroundColor: PRIMARY_COLOR }, headerTintColor: '#fff', }} component={OneTimeAQViewer} />
        <Stack.Screen name="placesPage" options={{ headerShown: false }} component={PlacesPage} />
        <Stack.Screen name="placeHistory" options={({ route }) => ({ title: route.params.name })} component={PlaceHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
