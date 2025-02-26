/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LegalNameScreen from './Screens/FirstScreen/NameScreen';
import NotificationScreen from './Screens/SecondScreen/NotificationScreen';
import NewsScreen from './Screens/ThirdScreen/NewsScreen';
import SplashScreen from 'react-native-splash-screen';




function App(): React.JSX.Element {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const Stack = createStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LegalName" component={LegalNameScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="NewsScreen" component={NewsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;
