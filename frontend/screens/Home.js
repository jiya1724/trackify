import React from 'react';
import { View, Image, Text } from 'react-native';
import pattern from '../assets/bgPattern.png';
import Logo from '../assets/Logo.png';
import bell from '../assets/home/Bell.png';

const Home = ({ username }) => {
  return (
    <View className='w-full h-full bg-bg'>
      <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />

      <View className='p-5 pt-10 h-[95px] w-full bg-darkBg bg-opacity-50 rounded-b-[30px]'>
        <View className='flex flex-row justify-between items-center'>
          <View className='flex flex-row items-center gap-4'>
            <Image className='h-[37.25px] w-[33px]' source={Logo} />
            <Text className='text-base text-white font-bold'>Namaste {username}</Text>
          </View>
          <View className='flex items-center'>
            <Image className='h-[28px] w-[28px]' source={bell} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;
