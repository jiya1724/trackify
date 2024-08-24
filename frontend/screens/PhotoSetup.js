import React from 'react'
import { View ,Text,Image} from 'react-native'
import pattern from '../assets/bgPattern.png'

const PhotoSetup = () => {
  return (
    <View className='bg-bg h-full w-full p-5 relative'>
        <Image className='absolute left-0  rotate-45 -translate-x-20' source={pattern} />
        <Image className='absolute bottom-0 right-0 rotate-12 translate-x-20 translate-y-7' source={pattern} />
        <View className='pt-10 flex justify-center items-center'><Text className='text-Blue text-base text-blue font-bold'>Setup Your Face</Text></View>
        

    </View>
  )
}

export default PhotoSetup