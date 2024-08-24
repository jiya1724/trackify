import { StyleSheet, Text, View, Image } from 'react-native'
import pattern from '../assets/bgPattern.png';
import React from 'react'
import Profile from '../assets/Navbar/profile.png'
import Record from "../assets/Navbar/records.png"
import Navbar from '../components/Navbar';

const Leave = () => {
  return (
    <View className='w-full h-full bg-bg  '>
      <Navbar/>
      <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />
      <View className='pt-10 flex-col items-center h-full '>
        <View><Text className='text-white text-lg font-bold '  >My Requests</Text></View>
        <View className="bg-slate-400 w-full h-full z-10 ">
        <View></View>
        </View>


      </View>
    </View>
  )
}

export default Leave

const styles = StyleSheet.create({})