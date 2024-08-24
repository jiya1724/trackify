import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
const Landing = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 2000, 
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <View className='flex justify-center items-center w-full h-full bg-bg'>
    <Animated.View style={{ opacity: fadeAnim }}>
      <Image 
        source={require('../assets/Logo.png')} 
        style={styles.logo} 
      />
    </Animated.View>
    </View>
  )
}


export default Landing

const styles = StyleSheet.create({
  
  logo: {
    width: 100,
    height: 113,
  },
});
