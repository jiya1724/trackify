import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import pattern from '../assets/bgPattern.png';
import Logo from '../assets/Logo.png';
import bell from '../assets/home/Bell.png';
import map from '../assets/home/Map.png';
import checkIn from '../assets/home/Check In.png'
import Navbar from '../components/Navbar';

const Home = () => {
  const [username] = useState('Jiya Trivedi');
  const [c_location] = useState('Gail India');
  const [currentDateTime, setCurrentDateTime] = useState('');

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

  return (
    <View className='w-full h-full bg-bg'>
      <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />

      <View className='p-5 pt-10 h-[95px] z-50 w-full bg-darkBg backdrop-blur-2xl bg-opacity-50 rounded-b-[30px]'>
        <View className='flex flex-row justify-between items-center'>
          <View className='flex flex-row items-center gap-4'>
            <Image className='h-[37.25px] w-[33px]' source={Logo} />
            <Text className='text-base text-white font-bold'>Namaste! {username}</Text>
          </View>
          <View className='flex items-center'>
            <Image className='h-[28px] w-[28px]' source={bell} />
          </View>
        </View>
      </View>

      <View className='flex flex-col gap-7 justify-center items-center pt-5'>
        <View className='flex flex-col space-y-2'>
          <Image className='flex justify-center items-center h-[349px]' source={map} />
          <View className='flex flex-row items-center justify-between'>
            <Text className="text-white font-semibold text-[11px]">Current Location: {c_location}</Text>
            <Text className="date text-darkGrey font-semibold text-[11px]">{currentDateTime}</Text>
          </View>
        </View>

        <View>
          <View className='w-[200px] h-[200px]  bg-Red flex justify-center items-center rounded-full'>
            <TouchableOpacity style={styles.button} >
                <Image className='h-[83px] w-[63px]' source={checkIn}/>
                <Text className='text-white font-bold text-base uppercase'>Manual</Text>
                <Text className='text-white font-bold text-base uppercase'>Check In</Text>
            </TouchableOpacity>
          </View>
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
