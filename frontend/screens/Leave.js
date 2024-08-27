import { StyleSheet, Text, View, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import empty from '../assets/leave/requestEmpty.png'
import pattern from '../assets/bgPattern.png';
import React from 'react';
import Navbar from '../components/Navbar';

const Leave = () => {
  return (
    <View className='w-full h-full bg-bg relative '>
      <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />
      
      <View className='pt-10  pb-5 flex-col items-center'>
        <Text className='text-white text-lg font-bold'>My Requests</Text>
      </View>
      <View className='h-full w-full p-5'>
        
        <View className='flex-1 relative h-full justify-center items-center '>
            <Image className='h-40 w-52' source={empty}></Image>
        </View>
      

        <View className='w-full'>
            <TouchableOpacity  style={styles.button} >
              <Text className="text-white font-bold text-base">Login</Text>
            </TouchableOpacity>
          </View>
      
      <View className='  h-36 w-full bottom-0 '></View>
      </View>
      <Navbar />
    </View>
  );
}

export default Leave;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3085FE',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
