import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import pattern from '../assets/bgPattern.png';
import Logo from '../assets/Logo.png';
import bell from '../assets/home/Bell.png';
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Map from '../components/Map';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as geolib from 'geolib';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];
    if (location) {
      console.log('Background location:', location.coords.latitude, location.coords.longitude);
    }
  }
});

const Home = () => {
  const [username] = useState('Jiya Trivedi');
  const [c_location] = useState('Gail India');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [name, setName] = useState('');
  const [trackingInterval, setTrackingInterval] = useState(null);
  const userData = useSelector((state) => state.authentication.userData);

  useEffect(() => {
    const formatDate = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const day = now.getDate().toString().padStart(2, '0');
      const month = now.toLocaleString('en-US', { month: 'short' });
      const year = now.getFullYear().toString().slice(-2);

      return `${hours}:${minutes} ${ampm}, ${day} ${month} ${year}`;
    };

    setCurrentDateTime(formatDate());
  }, []);

  useEffect(() => {
    const getLocalStorage = async () => {
      const value = await AsyncStorage.getItem('auth-token');
      if (value !== null) {
        // value previously stored
      }
    };
    const getUser = async () => {
      try {
        const value = await AsyncStorage.getItem('auth-token');
        const response = await fetch('http://192.168.29.199:5000/emp/getemp', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': value,
          },
        });
        const data = await response.json();
        setName(data?.name);
      } catch (error) {
        console.error(error);
      }
    };

    getLocalStorage();
    getUser();
  }, []);

  const [region, setRegion] = useState({
    latitude: 19.077559739576277,
    longitude: 72.90043088465742,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  // State for location tracking
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [foregroundStatus, requestForegroundPermission] = Location.useForegroundPermissions();
  const [backgroundStatus, requestBackgroundPermission] = Location.useBackgroundPermissions();
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    };
  }, [trackingInterval]);

  const startTracking = async () => {
    if (foregroundStatus?.status !== 'granted') {
      let { status } = await requestForegroundPermission();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    }

    if (backgroundStatus?.status !== 'granted') {
      let { status } = await requestBackgroundPermission();
      if (status !== 'granted') {
        setErrorMsg('Permission to access background location was denied');
        return;
      }
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 0.5, // Minimum change (in meters) required for an update
      deferredUpdatesInterval: 1000, // Receive updates at least every 1000ms
      foregroundService: {
        notificationTitle: 'Location Tracking',
        notificationBody: 'Your location is being tracked in the background',
      },
    });

    setIsTracking(true);
  };

  const stopTracking = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    setIsTracking(false);
  };

  useEffect(() => {
    if (location) {
      const checkLatitude = location.coords.latitude;
      const checkLongitude = location.coords.longitude;
      console.log(
        geolib.isPointWithinRadius(
          { latitude: 19.07754689737984, longitude: 72.9003631331292 },
          { latitude: checkLatitude, longitude: checkLongitude },
          14
        )
      );
    }
  }, [location]);

  return (
    <View className='w-full h-full bg-bg'>
      <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />

      <View className='p-5 pt-10 h-[95px] z-50 w-full bg-darkBg backdrop-blur-2xl bg-opacity-50'>
        <View className='flex flex-row justify-between items-center'>
          <View className='flex flex-row items-center gap-4'>
            <Image className='h-[37.25px] w-[33px]' source={Logo} />
            <Text className='text-base text-white font-bold'>Namaste! {name}</Text>
          </View>
          <View className='flex items-center'>
            <Image className='h-[28px] w-[28px]' source={bell} />
          </View>
        </View>
      </View>

      <View className='flex flex-col gap-7 justify-center items-center pt-5'>
        <View className='flex flex-col space-y-2'>
          <View className='w-[90%]'>
            <Map region={region} setRegion={setRegion} />
          </View>
          <View className='flex flex-row items-center justify-between'>
            <Text className="text-white font-semibold text-[11px]">Current Location: {c_location}</Text>
            <Text className="date text-darkGrey font-semibold text-[11px]">{currentDateTime}</Text>
          </View>
        </View>
        <View>
          <Text className='text-white' style={styles.paragraph}></Text>
          <TouchableOpacity onPress={startTracking} className='bg-slate-500'>
            <Text className="text-white">Start</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={stopTracking} className='bg-slate-500'>
            <Text className="text-white">Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Navbar></Navbar>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3085FE',
    width: 180,
    height: 180,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;
