import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import pattern from '../assets/bgPattern.png';
import React from 'react';
import Navbar from '../components/Navbar';

const Leave = () => {
  return (
    <View className='w-full h-full bg-bg'>
      <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />
      
      <View className='flex-1 pt-10 flex-col items-center'>
        <Text className='text-white text-lg font-bold'>My Requests</Text>
        
        <ScrollView  className='contentContainerStyle={{ flexGrow: 1,  }}w'>
        
          <View className="bg-slate-400 space-y-10 w-full z-10 pt-10 items-center justify-center">
            <View className="bg-red-600 w-[100px] h-[300px] justify-center" />
            <View className="bg-red-600 w-[100px] h-[50px] justify-center" />
            <View className="bg-red-600 w-[100px] h-[50px] justify-center" />
            <View className="bg-red-600 w-[100px] h-[50px] justify-center" />
            <View className="bg-red-600 w-[100px] h-[50px] justify-center" />

            <View className="bg-red-600 w-[100px] h-[50px] justify-center" />
          </View>
        </ScrollView>
      </View>
      <View className='bg-transparent h-16 w-full absolute bottom-0'></View>

      <Navbar />
    </View>
  );
}

export default Leave;

const styles = StyleSheet.create({});
