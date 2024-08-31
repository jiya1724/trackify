import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Map from '../components/Map';
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import SuggestModal from '../components/SuggestModal';
import Connected from '../assets/home/connected.svg';
import NotConnected from '../assets/home/notConnected.svg';

const Home = () => {
  const [username] = useState('Jiya Trivedi');
  const [c_location] = useState('Gail India');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [name, setName] = useState('');
  const [trackingInterval, setTrackingInterval] = useState(null);
  const userData = useSelector((state) => state.authentication.userData);
  const dispatch = useDispatch();
  const [isCheckedIn, setIsCheckedIn] = useState(true);

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

  // Logic for tracking and geofencing goes from here

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [foregroundStatus, requestForegroundPermission] = Location.useForegroundPermissions();
  const [backgroundStatus, requestBackgroundPermission] = Location.useBackgroundPermissions();
  const [isTracking, setIsTracking] = useState(false); // Track if tracking is active
  const [locationSubscription, setLocationSubscription] = useState(null); // Manage subscription

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [locationSubscription]);

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

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest, // or any other accuracy level   
        distanceInterval: 0.5, // Minimum change (in meters) required for an update
      },
      (newLocation) => {
        setLocation(newLocation);
        console.log(newLocation.coords.latitude)
        console.log(newLocation.coords.longitude)
      }
    );

    setLocationSubscription(subscription);
    setIsTracking(true);
  };

  const stopTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
      setIsTracking(false);
    }
  };

  let text = isTracking ? 'Tracking location...' : 'Press Start to track location';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location, null, 2);
  }

  useEffect(() => {
    if (location) {
      const checkLatitude = location.coords.latitude;
      const checkLongitude = location.coords.longitude;
      console.log(geolib.isPointWithinRadius(
        { latitude: 19.07754689737984, longitude: 72.9003631331292 },
        { latitude: checkLatitude, longitude: checkLongitude },
        14
      ));
    }
  }, [location]);

  return (
    <View className="w-full h-full">
      <ScrollView className="flex-1">
        <View className="w-full">
          <View className="flex flex-col gap-5 justify-center items-center">
            <View className="flex flex-col space-y-2">
              <View className="w-full">
                <Map region={region} setRegion={setRegion} />
              </View>
              <View className="flex flex-row items-center justify-between">
                <Text className="text-white font-semibold text-[11px]">
                  Current Location: {c_location}
                </Text>
                <Text className="date text-darkGrey font-semibold text-[11px]">
                  {currentDateTime}
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-white" style={styles.paragraph}></Text>
            </View>
          </View>
           {/* <TouchableOpacity onPress={startTracking} className='bg-slate-500'>
            <Text className="text-white">Start</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={stopTracking} className='bg-slate-500'>
            <Text className="text-white">Stop</Text>
          </TouchableOpacity> */}
          {isCheckedIn ? (
            <View className="items-center">
              <Connected />
              <View className="bg-darkBg border mt-5 border-solid border-seagreen rounded-md p-2">
                <Text className="font-bold text-sm text-seagreen">
                  02 hrs 15 mins
                </Text>
              </View>
              <Text className="text-xs font-semibold text-Blue mt-3">
                Checked In at: 10:20 am
              </Text>
            </View>
          ) : (
            <View className="items-center">
              <NotConnected />
              <Text className="text-Red font-bold text-xs mt-3">
                Not Checked In
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
