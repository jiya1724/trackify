import React from 'react'
import { View, Image , Text } from 'react-native'
import Navbar from '../components/Navbar'
import pattern from '../assets/bgPattern.png'
import SwitchTab from '../components/SwitchTab'

const Records = () => {
  return (
    <View className='bg-bg w-full h-full'>
      <Navbar/>
      <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-4 translate-x-20 ' source={pattern} />
      <View className='pt-16 flex justify-center items-center'>
        <Text className='text-white text-lg text-blue font-bold'>Records</Text>
      </View>
      <SwitchTab/>
      


    </View>
  )
}

export default Records