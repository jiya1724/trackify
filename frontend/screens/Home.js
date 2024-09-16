
import React, { useState, useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Map from '../components/Map';
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import Connected from '../assets/home/connected.svg';
import NotConnected from '../assets/home/notConnected.svg';
import IP_Address from '../utilities';
import Timer from '../components/Timer';
import { addLatestcheckIn, addLatestCheckOut, setShowCheckinTime,setWorking } from '../redux/punch/punchSlice';

const Home = () => {
  const [username] = useState('Jiya Trivedi');
  const [c_location] = useState('Gail India');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [name, setName] = useState('');
  const [trackingInterval, setTrackingInterval] = useState(null);
  const userData = useSelector((state) => state.authentication.userData);
  const [confirmationVisible, setConfirmationVisible] = useState(true);
  const dispatch = useDispatch();
  const handleCloseConfirmation = () => {
    setConfirmationVisible(false);
  };

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
        const response = await fetch(`http://${IP_Address}:5000/emp/getemp`, {
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
    latitude: 19.072778,
    longitude: 72.900730,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const [locationInRadius, setLocationInRadius] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [foregroundStatus, requestForegroundPermission] = Location.useForegroundPermissions();
  const [backgroundStatus, requestBackgroundPermission] = Location.useBackgroundPermissions();
  const [isTracking, setIsTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [timerStatus, setTimerStatus] = useState('false')
  useEffect(() => {
    return () => {
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
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 0.5,
      },
      (newLocation) => {
        setLocation(newLocation);
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

  const getFormattedTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours || 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
  };

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkinTime, setCheckinTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  useEffect(() => {
    console.log(userCheckin);
    console.log(userCheckout);
  }, [isCheckedIn])

  const settingshowtime = (time) => {
    dispatch(setShowCheckinTime(time))
  }

  useEffect(() => {
    if (location) {
      const checkLatitude = location.coords.latitude;
      const checkLongitude = location.coords.longitude;
      setLocationInRadius(geolib.isPointWithinRadius(
        { latitude: 19.072778, longitude: 72.900730 },
        { latitude: checkLatitude, longitude: checkLongitude },
        200
      ));
      console.log(checkLatitude)
      console.log(checkLongitude)
    }


    if (locationInRadius) {
      if (!isCheckedIn) {
        setIsCheckedIn(true)
        setTimerStatus('true')
        const settingTime = getFormattedTime();
        settingshowtime(settingTime);
        setCheckinTime(settingTime);

      }
    } else {
      if (isCheckedIn) {
        setIsCheckedIn(false)
        setTimerStatus('false')
        const settingTime = getFormattedTime();
        console.log(settingTime)
        setCheckOutTime(settingTime);
      }
    }


    if (locationInRadius && !isCheckedIn) {
      setIsCheckedIn(true);
      const time = getFormattedTime();
      setCheckinTime(time);
      handleTimecheckin();
    } else if (!locationInRadius && isCheckedIn) {
      setIsCheckedIn(false);
      const time = getFormattedTime();
      setCheckOutTime(time);
      handleTimeCheckOut();
    }
  }, [location]);

  const userCheckin = useSelector((state) => state.punch.latestCheckIn);
  const userCheckout = useSelector((state) => state.punch.latestCheckout);
  const showCheckin = useSelector((state) => state.punch.showCheckinTime);

  const handleTimecheckin = () => {
    dispatch(addLatestcheckIn(Date.now()));
  };

  const handleTimeCheckOut = () => {
    dispatch(addLatestCheckOut(Date.now()));
  };

  useEffect(() => {
    startTracking();


  }, [])



  useEffect(() => {
    if (userCheckin && userCheckout && checkOutTime) {
      if (userCheckout > userCheckin) {
        const differenceInMs = userCheckout - userCheckin;
        const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60)); // Convert to hours
        const differenceInMinutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining to minutes
        const differenceInSeconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);
        dispatch(setWorking(`${differenceInHours} hours, ${differenceInMinutes} minutes , ${differenceInSeconds} sec`));
        alert(`Time worked: ${differenceInHours} hours, ${differenceInMinutes} minutes , ${differenceInSeconds} sec`);
      }
    }
  }, [userCheckin, userCheckout, checkOutTime]);
  // const showTime = () => {
  //   if (userCheckin && userCheckout) {
  //     console.log('Check-in time (ms):', userCheckin);
  //     console.log('Check-out time (ms):', userCheckout);


  //     if (userCheckout > userCheckin) {
  //       const differenceInMs = userCheckout - userCheckin;
  //       const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60)); // Convert to hours
  //       const differenceInMinutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining to minutes
  //       const differenceInSeconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);
  //       console.log(`Time worked: ${differenceInHours} hours, ${differenceInMinutes} minutes, ${differenceInSeconds} sec`);
  //       alert(`Time worked: ${differenceInHours} hours, ${differenceInMinutes} minutes , ${differenceInSeconds} sec `);
  //     } else {
  //       console.log('Error: Check-out time is earlier than Check-in time.');
  //       alert('Error: Check-out time is earlier than Check-in time.');
  //     }
  //   } else {
  //     console.log('Please check in and check out to see the difference.');
  //     alert('Please check in and check out to see the difference.');
  //   }
  // };

  // Background

  const startBackgroundLocationUpdates = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access background location was denied');
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 0.5,
      deferredUpdatesInterval: 1000,
      foregroundService: {
        notificationTitle: 'Location Tracking',
        notificationBody: 'We are tracking your location in the background',
      },
    });
  };

  const LOCATION_TASK_NAME = 'background-location-task';                   
  useEffect(() => {
    if (foregroundStatus?.status !== 'granted') {
      requestForegroundPermission();
    }
    if (backgroundStatus?.status !== 'granted') {
      requestBackgroundPermission();
    }

    startBackgroundLocationUpdates();
  }, []);


  return (
    <View className="w-full h-full">
      <ScrollView className="flex-1">
        <View className="w-full">
          <View className="flex flex-col gap-5 mb-8  justify-center items-center">
            <Map region={region} setRegion={setRegion} />
            <View className="flex flex-row w-full pr-4 pl-4 justify-between ">
              <Text className="text-white font-semibold text-[11px]">Current Location: {c_location}</Text>
              <Text className="date text-darkGrey font-semibold text-[11px]">{currentDateTime}</Text>
            </View>
          </View>
          {/* <View className="flex-row">
            <TouchableOpacity className="bg-white p-4" >
              <Text>calculate</Text>
            </TouchableOpacity>
          </View> */}
          {isCheckedIn ? (
            <View className="items-center">
              <Connected />
              <Timer status={timerStatus} />
            </View>
          ) : (
            <View className="items-center">
              <NotConnected />
              <Text className="text-Red font-bold text-xs mt-3">Not Checked In</Text>
            </View>
          )}

          {isCheckedIn && confirmationVisible ? (
            <View className="p-3 -translate-y-16  bg-darkBg z-20 justify-center border border-solid border-seagreen rounded-xl">
              <Text className="text-seagreen font-bold text-[10px]">Checked In : {showCheckin}</Text>
              <Text className="text-darkGrey text-[8px]">You are within 200 mts of your workplace</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseConfirmation}>
                <Svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M1 16L16 1M16 16L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </TouchableOpacity>
            </View>
            
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 16,
  },
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