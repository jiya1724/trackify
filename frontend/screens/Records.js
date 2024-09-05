import React from 'react'
import { View, Image , Text, ScrollView } from 'react-native'
import Navbar from '../components/Navbar'
import pattern from '../assets/bgPattern.png'
import SwitchTab from '../components/SwitchTab'
import Offsite from '../components/Offsite'
import Office from '../components/Office'
import { useSelector, useDispatch } from 'react-redux';

const Records = () => {
  const showCheckin = useSelector((state) => state.punch.showCheckinTime);
  return (
    <View className='bg-bg w-full h-full'>
      <Navbar/>
      <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-4 translate-x-20 ' source={pattern} />
      <View className='pt-16 flex justify-center items-center'>
        <Text className='text-white text-lg text-blue font-bold'>Records</Text>
      </View>
      <ScrollView  className='contentContainerStyle={{ flexGrow: 1,  }}'>
      <SwitchTab name1="Office" name2="Off-site" comp1={Office} comp2={Offsite}/>
      
      </ScrollView>
      

    </View>
  )
}

export default Records