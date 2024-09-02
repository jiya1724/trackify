import { StyleSheet, Text, View,Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import pattern from '../assets/bgPattern.png'
import Emp from '../assets/profile/empProfile.svg'

import ChangePin from '../assets/profile/changePin.svg'
import Logout from '../assets/profile/logout.svg'
import Notifi from '../assets/profile/notifi.svg'
import Tc from '../assets/profile/t&c.svg'

import Arrow from '../assets/profile/arrowSide.svg'
import ChangePIN from '../components/ChangePIN'
const Profile = () => {
  return (
    <View className='w-full h-full bg-bg'>
        <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />

      <View className='w-full p-5'>
        <View className='w-full justify-center items-center mt-20 space-y-4'>
        <Emp></Emp>
        <Text className='text-white font-bold text-lg '>Employee1</Text>
        </View>
        
        <View className=''>
            <TouchableWithoutFeedback ><View className='flex-row justify-between items-center pb-6 pt-6 border-b-[0.5px] border-solid border-darkGrey'>
                <View  className='flex-row justify-center items-center space-x-3'>
                    <ChangePin></ChangePin>
                    <Text className='text-white font-bold text-sm'>Change PIN</Text>
                </View>
                <View className='items-center justify-center'>
                    <Arrow></Arrow>
                </View>
            </View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback><View className='flex-row justify-between items-center pb-6 pt-6 border-b-[0.5px] border-solid border-darkGrey'>
                <View  className='flex-row justify-center items-center space-x-3'>
                    <Notifi></Notifi>
                    <Text className='text-white font-bold text-sm'>Notifications</Text>
                </View>
                <View className='items-center justify-center'>
                    <Arrow></Arrow>
                </View>
            </View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback><View className='flex-row justify-between items-center pb-6 pt-6 border-b-[0.5px] border-solid border-darkGrey'>
                <View  className='flex-row justify-center items-center space-x-3'>
                    <Tc></Tc>
                    <Text className='text-white font-bold text-sm'>Terms & Conditions</Text>
                </View>
                <View className='items-center justify-center'>
                    <Arrow></Arrow>
                </View>
            </View></TouchableWithoutFeedback>
            <TouchableWithoutFeedback><View className='flex-row justify-between items-center pb-6 pt-6 '>
                <View  className='flex-row justify-center items-center space-x-3'>
                    <Logout></Logout>
                    <Text className='text-white font-bold text-sm'>Logout</Text>


                </View>
                
            </View></TouchableWithoutFeedback>
        </View>
        
      </View>


      <Navbar/>

     
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})