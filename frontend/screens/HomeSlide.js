import { StyleSheet, Text, View ,Image, ScrollView} from 'react-native'
import pattern from '../assets/bgPattern.png';
import Logo from '../assets/Logo.png';
import bell from '../assets/home/Bell.png';
import map from '../assets/home/Map.png';
import React, { useState } from 'react'
import SwitchTab from '../components/SwitchTab'
import Home from './Home'
import Navbar from '../components/Navbar';
import Manual from '../screens/Manual';
import IP_Address from '../utilities';
import Switch from '../components/Switch';

const HomeSlide = () => {
    const name= useState('Jiya')
    console.log(IP_Address);
  return (
    <View className="w-full h-full bg-bg ">
        <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />

      <View className='p-5 pt-10 h-[95px] z-50 w-full bg-darkBg backdrop-blur-2xl bg-opacity-50'>
        <View className='flex flex-row justify-between items-center'>
          <View className='flex flex-row items-center gap-4'>
            <Image className='h-[37.25px] w-[33px]' source={Logo} />
            <Text className='text-base text-white font-bold'>Namaste! Employee1</Text>
          </View>
          <View className='flex items-center'>
            <Image className='h-[28px] w-[28px]' source={bell} />
          </View>
        </View>
      </View>
      <ScrollView>
      <Switch/>
      </ScrollView>
      <View className='bg-yellow-300 h-16 w-full'></View>
      <Navbar/>
    </View>
  )
}

export default HomeSlide

const styles = StyleSheet.create({})