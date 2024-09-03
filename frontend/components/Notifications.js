import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native'
import React ,{useState}from 'react'
import pattern from '../assets/bgPattern.png'
import Navbar from './Navbar'
import Back from '../assets/profile/backArrow.svg'

const ChangePIN = () => {
 
  return (
    <View className='w-full h-full bg-bg'>
        <Image className='absolute left-0 -translate-x-20' source={pattern} />
        <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />

        <View className='bg-darkBg flex-row items-center pt-10  space-x-[25%] pb-5 '>
            <TouchableWithoutFeedback>
                <View className='translate-x-3'>
                <TouchableWithoutFeedback>
                    <Back></Back>
                </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
            <View className=' justify-center'>
                <Text className='text-white font-bold text-lg'>Notifications</Text>
            </View>
        </View>

        <View className='p-5 space-y-6'>
            </View>
        <Navbar/>
      
    </View>
  )
}

export default ChangePIN

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 56,
        color: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 14
    
      },
      button: {
        backgroundColor: '#3085FE',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
})