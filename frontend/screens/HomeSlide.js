import { StyleSheet, Text, View ,Image} from 'react-native'
import pattern from '../assets/bgPattern.png';
import Logo from '../assets/Logo.png';
import bell from '../assets/home/Bell.png';
import map from '../assets/home/Map.png';
import React, { useState } from 'react'
import SwitchTab from '../components/SwitchTab'
import Home from './Home'
import Navbar from '../components/Navbar';

const HomeSlide = () => {
    const name= useState('Jiya')
  return (
    <View className="w-full h-full bg-bg">
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
        <SwitchTab name1="Main Office" name2="Manual CheckIn/Out" comp1={<Home/>} comp2={<Home/>}/>
      <Navbar/>
    </View>
  )
}

export default HomeSlide

const styles = StyleSheet.create({})