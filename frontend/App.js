import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './screens/Landing';
import Signup from './screens/Signup';
import PhotoSetup from './screens/PhotoSetup';
import Home from './screens/Home'
import Background from './components/Background';
import Leave from './screens/Leave';
import Login from './screens/Login'
import Records from './screens/Records'
import { Provider } from 'react-redux';
import store from './redux/store';
import FaceVerify from './screens/FaceVerify';
import HomeSlide from './screens/HomeSlide';

export default function App() {
  const Stack = createNativeStackNavigator();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <Landing />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name="PhotoSetup"
            component={PhotoSetup}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='HomeSlide'
            component={HomeSlide}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Records"
            component={Records}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Leave"
            component={Leave}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Face Verify"
            component={FaceVerify}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
