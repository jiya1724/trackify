import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import Digi from '../assets/digiIndia.svg';

const Landing = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const scaleAnim = useRef(new Animated.Value(0)).current; // Initial value for scale: 0 (invisible)

  useEffect(() => {
    
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 2000, 
      useNativeDriver: true,
    }).start();

    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, 
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View className='flex flex-col justify-center items-center w-full h-full bg-bg'>
      
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image 
          source={require('../assets/Logo.png')} 
          style={styles.logo} 
        />
      </Animated.View>

    
      <Animated.View className='absolute bottom-16' style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Digi />
      </Animated.View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 113,
  },
});
