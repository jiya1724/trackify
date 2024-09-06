import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { Button, Text, View, Alert, StyleSheet,Touchable, TouchableOpacity } from 'react-native';

const BiometricAuth = ({navigation}) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    checkDeviceForHardware();
  }, []);

  const checkDeviceForHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(compatible);
  };

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        'Biometric Authentication',
        'No fingerprints found. Please enroll in your device settings.'
      );
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Fingerprint',
      fallbackLabel: 'Enter Passcode',
    });

    if (result.success) {
    //   Alert.alert('Authentication Successful', 'You are authenticated!');
      navigation.navigate('HomeSlide')
    } else {
      Alert.alert('Authentication Failed', 'Please try again.');
    }
  };

  return (
    <View className='w-full justify-center items-center p-10 bg-bg h-full'>
      <Text className='text-base font-bold text-white'>Please Verify Your Identity</Text>
      {isBiometricSupported ? (
        // <Button title="Login with Fingerprint" onPress={handleBiometricAuth} />
        <View className='w-full mt-4'>
                  <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
                    <Text className="text-white font-bold text-base">Sign Up</Text>
                  </TouchableOpacity>
        </View>
      ) : (
        <Text>Biometric Authentication is not supported on this device.</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
    input: {
      height: 56,
      color: '#FFFFFF',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
    },
    button: {
      backgroundColor: '#007BFF',
      height: 56,
      width:'100%',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default BiometricAuth;
