import { StyleSheet, Text, View, Image } from 'react-native'
import Profile from '../assets/Navbar/profile.png'
import Record from "../assets/Navbar/records.png"
import React from 'react'

const Navbar = () => {
    return (
        <View className='absolute bottom-0 z-20 bg-darkBg opacity-100 w-full h-16 flex-row items- justify-between pr-4 pl-4 '>

            <View className=' flex items-center justify-center space-y-1 ' >

                <Image source={Profile}></Image>
                <Text className='text-white'>Hello</Text>
            </View>
            <View className=' flex items-center justify-center space-y-1 ' >

                <Image source={Profile}></Image>
                <Text className='text-white'>Hello</Text>
            </View>
            <View className=' flex items-center justify-center space-y-1 ' >

                <Image source={Record}></Image>
                <Text className='text-white'>Hello</Text>
            </View>
            <View className=' flex items-center justify-center space-y-1 ' >

                <Image source={Profile}></Image>
                <Text className='text-white'>Profile</Text>
            </View>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({})